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

export default function Allcontacts({ history }) {
  var [contacts, setContacts] = useState([]);
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
  const loadcontacts = () => {
    Axios.get(`${process.env.REACT_APP_URL}contacts`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setContacts(res.data);
        console.log(res.data);
        //  console.log(images);
      })
      .catch((err) => {
        toast.error(`Error To Your Information `);
      });
  };
  useEffect(() => {
    loadcontacts();
  }, []);
  
  
 


  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
    setModalInfo({ ...modalInfo, [text]: e.target.value });
  };
  let his = useHistory();

  const handleDelete = (id) => {
    // console.log("Delete");
    Axios.delete(`${process.env.REACT_APP_URL}contacts/${id}`, {
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
  const all = contacts.map((p) => {
      console.log(p.name);
    return (
      <tr>
        <td>{p.firstName}</td>
        <td>{p.lastName}</td>
        <td>{p.mail}</td>
        <td>{p.message}</td>
        
        <td>
            
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
            
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">contacts</CardTitle>
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
