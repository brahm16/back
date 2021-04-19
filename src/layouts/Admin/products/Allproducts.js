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

export default function Allproducts({ history }) {
  var [products, setProducts] = useState([]);
  var [modalInfo, setModalInfo] = useState([]);
  const [file, setFile] = useState("");
  const [img ,setImg] =useState("");
  const [formData, setFormData] = useState({
    name: "",
    price: "",
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
  const loadProducts = () => {
    Axios.get(`${process.env.REACT_APP_URL}products`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setProducts(res.data);
        console.log(res.data);
        //  console.log(images);
      })
      .catch((err) => {
        toast.error(`Error To Your Information `);
      });
  };
  useEffect(() => {
    loadProducts();
  }, []);
  const handleToggle = (imag) => {
    setImg(imag);
   toggle1();
   console.log(isToggled1);
   console.log(imag);
  };

  const handletoggleUpdate = (prod) =>{
    setModalInfo(prod);
    console.log(prod);
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
    data.append("price", formData.price);
    data.append("desc", formData.desc);
    toast.success("product added successfully")


    Axios.post(`${process.env.REACT_APP_URL}products`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {
      console.log(response);
   //   toast.success("product added successfully")
      window.location.reload();
    });
  };

  const handleUpdate = async (id , e) => {
    e.preventDefault();
    console.log("on submit " + modalInfo.name);
 
    const data = new FormData();
    console.log(modalInfo.image);
    console.log("file" + file.name);
    // console.log(imagefile.files[0]);
    data.append("image", file);
    data.append("name", modalInfo.name);
    data.append("price", modalInfo.price);
    data.append("desc", modalInfo.desc);
    toast.success("product updated successfully")
    
    
    console.log("update ok "+modalInfo.name);
     return () => console.log("update ok ");

    await Axios.patch(`${process.env.REACT_APP_URL}products/${id}`, data, {
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
    Axios.delete(`${process.env.REACT_APP_URL}products/${id}`, {
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
    setFile(e.target.files[0]);
  };

  const { name, price , desc , image } = formData;
  //this methode is wrong
 
 const  handleRemove=()=>{
    toast.warn("image remove from the slide successfully")
  }
  const all = products.map((p) => {
      console.log(p.name);
    return (
      <tr>
        <td>{p.name}</td>
        <td>{p.price}</td>
        <td>{p.desc}</td>
        <td>
          <img
            alt={p.name}
            className="avatar"
            src={process.env.PUBLIC_URL + `/uploads/${p.image}`}
            onClick={()=>handleToggle(p.image)}
          />
        </td>
        <td>
            
          <button style={{marginRight:"1rem"}} onClick={()=>handletoggleUpdate(p)}><i className="tim-icons icon-pencil"></i></button>
         
          <button style={{marginRight:"1rem"}} onClick={() => handleDelete(p._id)}>
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
                <ModalHeader toggle={isUpdated}>Update product</ModalHeader>
                <ModalBody>
                <Form onSubmit={(e) => handleUpdate(modalInfo._id , e)} method="Post">
                <FormGroup>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    color="info"
                    type="text"
                    id="name"
                    name="name"
                    value={modalInfo.name}
                    onChange={handleChange("name")}
                  />
                   <Label htmlFor="price">price</Label>                 
                  <Input
                  color="info"
                  type="text"
                  id="price"
                  name="price"
                  value={modalInfo.price}
                  onChange={handleChange("price")}
                />
                 <Label htmlFor="desc">description</Label>
                <Input
                    color="info"
                    type="textarea"
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
            <ModalHeader toggle={isToggled}>Add Product</ModalHeader>
            <ModalBody>
              <Form onSubmit={handleSubmit} method="Post">
                <FormGroup>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    color="info"
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={handleChange("name")}
                  />
                   <Label htmlFor="price">price</Label>                 
                  <Input
                  color="info"
                  type="text"
                  id="price"
                  name="price"
                  value={price}
                  onChange={handleChange("price")}
                />
                 <Label htmlFor="desc">description</Label>
                <Input
                    color="info"
                    type="textarea"
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
                <CardTitle tag="h4">Products</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Name</th>
                      <th>Price</th>
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
