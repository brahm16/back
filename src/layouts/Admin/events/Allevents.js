import Axios from "axios";
import { signout } from "helpers/auth";
import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Table,
} from "reactstrap";

export default function Allevents({ history }) {
  var [events, setEvents] = useState([]);
  var [modalInfo, setModalInfo] = useState([]);
  const [file, setFile] = useState("");
  const [img ,setImg] =useState("");
  const [formData, setFormData] = useState({
    name: "",
    placesNembre: "",
    startDate: "",
    endDate: "",
    desc: "",
    image: "",
  });
  const [isToggled, setIsToggled] = React.useState(false);
  const [isToggled1, setIsToggled1] = React.useState(false);
  const [isUpdated, setIsUpdated] = React.useState(false);

  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = React.useCallback(() => setIsToggled(!isToggled));
  const toggle1 = React.useCallback(() => setIsToggled1(!isToggled1));
  const toggleUpdate = React.useCallback(() => setIsUpdated(!isUpdated));

  const open = React.useCallback(() => setIsOpen(!isOpen));
  const loadEvents = () => {
    Axios.get(`${process.env.REACT_APP_URL}events`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setEvents(res.data);
        console.log(res.data);
        //  console.log(images);
      })
      .catch((err) => {
        toast.error(`Error To Your Information `);
      });
  };
  useEffect(() => {
    loadEvents();
  }, []);
  const handleToggle = (imag) => {
    setImg(imag);
   toggle1();
   console.log(isToggled1);
   console.log(imag);
  };

  const handletoggleUpdate = (prod) =>{
    setModalInfo(prod);
    console.log("hihi"+prod.image);
    console.log(formData);
    console.log(modalInfo);
    
    toggleUpdate();

  };
 

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("on submit " + formData.name);
 
    const data = new FormData();
    console.log(formData.image);
    console.log("file" + file.name);
    // console.log(imagefile.files[0]);
    data.append("image", file);
    data.append("name", formData.name);
    data.append("placesNembre", formData.placesNembre);
    data.append("desc", formData.desc);
    data.append("startDate", formData.startDate);
    data.append("endDate", formData.endDate);
    toast.success("event added successfully")


    Axios.post(`${process.env.REACT_APP_URL}events`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {
      console.log(response);
   //   toast.success("event added successfully")
      window.location.reload();
    });
  };

  const handleUpdate = async (id , e) => {
    e.preventDefault();
   
    console.log("on submit " + modalInfo.name);
 
    const data = new FormData();
    console.log(modalInfo.image);
    //console.log("file" + file.name);
    // console.log(imagefile.files[0]);
    data.append("image", file);
    data.append("name", modalInfo.name);
    data.append("placesNembre", modalInfo.placesNembre);
    data.append("desc", modalInfo.desc);
    data.append("startDate", modalInfo.startDate);
    data.append("endDate", modalInfo.endDate);
    toast.success("product updated successfully")
    
    //console.log("update ok "+modalInfo.name);
   // return () => console.log("update ok ");

    await Axios.patch(`${process.env.REACT_APP_URL}events/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {
      console.log(response);
   //   toast.success("product added successfully")
      window.location.reload();
    });
  };

  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
    setModalInfo({ ...modalInfo, [text]: e.target.value });
  };
  let his = useHistory();

  const handleDelete = (id) => {
    // console.log("Delete");
    Axios.delete(`${process.env.REACT_APP_URL}events/${id}`, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {
      console.log(response);
      toast.error("product deleted");
      window.location.reload();
    });
  };
  const handleChangeFile = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
    setModalInfo({ ...modalInfo, [text]: e.target.value });
    setFile(e.target.files[0]);
  };

  const { name, placesNembre,startDate , endDate , desc , image } = formData;
  //this methode is wrong
 
 const  handleRemove=()=>{
    toast.warn("image remove from the slide successfully")
  }
  const all = events.map((ev) => {
      console.log(ev.name);
    return (
      <tr>
        <td>{ev.name}</td>
        <td>{ev.placesNembre}</td>
        <td>{ev.startDate}</td>
        <td>{ev.endDate}</td>
        <td>{ev.desc}</td>
        <td>
          <img
            alt={ev.name}
            className="avatar"
            src={process.env.PUBLIC_URL + `/uploads/${ev.image}`}
            onClick={()=>handleToggle(ev.image)}
          />
        </td>
        <td>
            
          <button style={{marginRight:"1rem"}} onClick={()=>handletoggleUpdate(ev)}><i className="tim-icons icon-pencil"></i></button>
         
          <button style={{marginRight:"1rem"}} onClick={() => handleDelete(ev._id)}>
            <i className="tim-icons icon-trash-simple"></i>
          </button>
        </td>
      </tr>
    );
  });


  return (
    <>

      <div className="content">
      
        <Row>
            <Modal isOpen={isToggled1} toggle={isToggled1}>
                <ModalHeader toggle={isToggled1}>Show Image</ModalHeader>
                <ModalBody>
                <img
                alt={img}
                className="avatar" src={process.env.PUBLIC_URL + `/uploads/${img}`}
                />
                </ModalBody>
                <ModalFooter>
                        <Button className="btn-neutral" color="info" onClick={toggle1}>
                            Cancel
                        </Button>
                        </ModalFooter>
            </Modal>
            <Modal isOpen={isUpdated} toggle={isUpdated}>
                <ModalHeader toggle={isUpdated}>Update event</ModalHeader>
                <ModalBody>
                <Form onSubmit={(e) => handleUpdate(modalInfo._id , e)} method="Post">
                <FormGroup>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    color="info"
                    type="text"
                    style={{color: '#000'}}
                    id="name"
                    name="name"
                    value={modalInfo.name}
                    onChange={handleChange("name")}
                  />
                   <Label htmlFor="placesNembre">places Number</Label>                 
                  <Input
                  color="info"
                  type="number"
                  style={{color: '#000'}}

                  id="placesNembre"
                  name="placesNembre"
                  value={modalInfo.placesNembre}
                  onChange={handleChange("placesNembre")}
                />
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                    color="info"
                    type="Date"
                    style={{color: '#000'}}

                    id="startDate"
                    name="startDate"
                    value={modalInfo.startDate}
                    onChange={handleChange("startDate")}
                  />
                  <Label htmlFor="endDate">End Date</Label>
                <Input
                    color="info"
                    type="date"
                    style={{color: '#000'}}

                    id="endDate"
                    name="endDate"
                    value={modalInfo.endDate}
                    onChange={handleChange("endDate")}
                  />
                 <Label htmlFor="desc">description</Label>
                <Input
                    color="info"
                    type="textarea"
                    style={{color: '#000'}}

                    id="desc"
                    name="desc"
                    value={modalInfo.desc}
                    onChange={handleChange("desc")}
                  />
                </FormGroup>
                <FormGroup>
                  <div class="upload-btn-wrapper">
                    <button class="btn1">Upload a file</button>
                    <input
                      color="info"
                      type="file"
                      style={{color: '#000'}}

                      name="image"
                      id="image"
                      value={image}
                      onChange={handleChangeFile("image")}

                    />
                  </div>
                </FormGroup>

                <Button type="submit" value="submit" color="primary">
                  Update
                </Button>
              </Form>
                </ModalBody>
                <ModalFooter>
                        <Button className="btn-neutral" color="info" onClick={toggleUpdate}>
                            Cancel
                        </Button>
                </ModalFooter>
            </Modal> 
          <Modal isOpen={isToggled} toggle={isToggled}>
            <ModalHeader toggle={isToggled}>Add Event</ModalHeader>
            <ModalBody>
              <Form onSubmit={handleSubmit} method="Post">
                <FormGroup>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    color="info"
                    type="text"
                    style={{color: '#000'}}

                    id="name"
                    name="name"
                    value={name}
                    onChange={handleChange("name")}
                  />
                   <Label htmlFor="placesNembre">placesNembre</Label>                 
                  <Input
                  color="info"
                  type="number"
                  style={{color: '#000'}}

                  id="placesNembre"
                  name="placesNembre"
                  value={placesNembre}
                  onChange={handleChange("placesNembre")}
                />
                 <Label htmlFor="startDate">startDate</Label>                 
                  <Input
                  color="info"
                  type="date"
                  style={{color: '#000'}}

                  id="startDate"
                  name="startDate"
                  value={startDate}
                  onChange={handleChange("startDate")}
                />
                 <Label htmlFor="endDate">endDate</Label>                 
                  <Input
                  color="info"
                  type="date"
                  style={{color: '#000'}}

                  id="endDate"
                  name="endDate"
                  value={endDate}
                  onChange={handleChange("endDate")}
                />
                 <Label htmlFor="desc">description</Label>
                <Input
                    color="info"
                    type="textarea"
                    style={{color: '#000'}}

                    id="desc"
                    name="desc"
                    value={desc}
                    onChange={handleChange("desc")}
                  />
                </FormGroup>
                <FormGroup>
                  <div class="upload-btn-wrapper">
                    <button class="btn1">Upload a file</button>
                    <input
                      color="info"
                      type="file"
                      style={{color: '#000'}}

                      name="image"
                      id="image"
                      value={image}
                      onChange={handleChangeFile("image")}
                    />
                  </div>
                </FormGroup>

                <Button type="submit" value="submit" color="primary">
                  Add
                </Button>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button className="btn-neutral" color="info" onClick={toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
          <Col md="12">
            <Button outline onClick={toggle}>
              {" "}
              Add
            </Button>
          </Col>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">events</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Name</th>
                      <th>Places Number</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Description</th>
                      <th>Images</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>{all}</tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
