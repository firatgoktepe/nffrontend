import { useState, useEffect, useRef } from "react";
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import API from "../API";
import 'font-awesome/css/font-awesome.min.css';
import Header from './Header'

const AddProject = ({ onAdd }) => {
  const [projectId, setProjectId] = useState(null);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [area, setArea] = useState("");
  const [surface_app, setSurfaceApp] = useState("");
  const [point_area, setPointArea] = useState("");
  const [delivery_date, setDeliveryDate] = useState("");
  const [ral_code, setRalCode] = useState("");
  const [pipe_time, setPipeTime] = useState("");
  const [node_time, setNodeTime] = useState("");
  const [point_time, setPointTime] = useState("");
  const [pipe_dict, setPipeDict] = useState("");
  const [node_dict, setNodeDict] = useState("");
  const [pipe_point_dict, setPipePointDict] = useState("");
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    refreshProjects();
  }, []);

  const refreshProjects = () => {
    API.get("/")
      .then((res) => {
        setProjects(res.data.data);
      })
      .catch(console.error);
  };

  const onSubmit = (e) => {
    e.preventDefault();
  
    API.post("/", {"data": {"code": code, "name": name, "location": location, "area": area,
    "surface_app": surface_app,
    "point_area": point_area,
    "delivery_date": delivery_date,
    "ral_code": ral_code,
    "pipe_time": pipe_time,
    "node_time": node_time,
    "point_time": point_time,
    "pipe_dict": pipe_dict,
    "node_dict": node_dict,
    "pipe_point_dict": pipe_point_dict}}).then(() => {
      refreshProjects()
      setCode("");
      setName("");
      setLocation("");
      setArea("");
      setSurfaceApp("");
      setPointArea("");
      setDeliveryDate("");
      setRalCode("");
      setPipeTime("");
      setNodeTime("");
      setPointTime("");
      setPipeDict("");
      setNodeDict("");
      setPipePointDict("");
    });
  };

  const onUpdate = (id) => {
    let item = {"data": {"code": code, "name": name, "location": location, "area": area,
    "surface_app": surface_app,
    "point_area": point_area,
    "delivery_date": delivery_date,
    "ral_code": ral_code,
    "pipe_time": pipe_time,
    "node_time": node_time,
    "point_time": point_time,
    "pipe_dict": pipe_dict,
    "node_dict": node_dict,
    "pipe_point_dict": pipe_point_dict}};
    API.put(`/${id}/`, item).then((res) => refreshProjects());
    updateElement.current.disabled = false;
  };

  const onDelete = (id) => {
    API.delete(`/${id}/`).then((res) => refreshProjects());
  };

  function selectProject(id) {
    let item = projects.filter((project) => project.id === id)[0];
    setCode(item.attributes.code);
    setName(item.attributes.name);
    setLocation(item.attributes.location);
    setArea(item.attributes.area);
    setSurfaceApp(item.attributes.surface_app);
    setPointArea(item.attributes.point_area);
    setDeliveryDate(item.attributes.delivery_date);
    setRalCode(item.attributes.ral_code);
    setPipeTime(item.attributes.pipe_time);
    setNodeTime(item.attributes.node_time);
    setPointTime(item.attributes.point_time);
    setPipeDict(item.attributes.pipe_dict);
    setNodeDict(item.attributes.node_dict);
    setPipePointDict(item.attributes.pipe_point_dict);
    setProjectId(item.attributes.id);
    updateElement.current.disabled = true;
  }

  const updateElement = useRef();

  return (
    <div className="container mt-5">
      
      <Header />


      <div className="row">
        <div className="col-md-4">
          <h3 className="float-left">Yeni Proje Oluştur</h3>
          <Form onSubmit={onSubmit} className="mt-4">
          <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Proje Kodu</Form.Label>
              <Form.Control
                type="text"
                placeholder="Proje kodunu giriniz"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Proje Adı</Form.Label>
              <Form.Control
                type="text"
                placeholder="Proje adını giriniz"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Yer</Form.Label>
              <Form.Control
                type="text"
                placeholder="Yeri giriniz"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Alan</Form.Label>
              <Form.Control
                type="text"
                placeholder="Alanı giriniz"
                value={area}
                onChange={(e) => setArea(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Yüzey İşlemi</Form.Label>
              <Form.Control
                type="text"
                placeholder="Yüzey işlemini giriniz"
                value={surface_app}
                onChange={(e) => setSurfaceApp(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Boyama Yüzey alanı</Form.Label>
              <Form.Control
                type="text"
                placeholder="Boyama yüzey alanını giriniz"
                value={point_area}
                onChange={(e) => setPointArea(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Teslim Tarihi</Form.Label>
              <Form.Control
                type="text"
                placeholder="Teslim tarihini giriniz"
                value={delivery_date}
                onChange={(e) => setDeliveryDate(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>RAL Kodu</Form.Label>
              <Form.Control
                type="text"
                placeholder="RAL kodunu giriniz"
                value={ral_code}
                onChange={(e) => setRalCode(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>PipeTime</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter PipeTime"
                value={pipe_time}
                onChange={(e) => setPipeTime(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>NodeTime</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter NodeTime"
                value={node_time}
                onChange={(e) => setNodeTime(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>PointTime</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter PointTime"
                value={point_time}
                onChange={(e) => setPointTime(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>PipeDict</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter PipeDict"
                value={pipe_dict}
                onChange={(e) => setPipeDict(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>NodeDict</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter NodeDict"
                value={node_dict}
                onChange={(e) => setNodeDict(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>PipePointDict</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter PipePointDict"
                value={pipe_point_dict}
                onChange={(e) => setPipePointDict(e.target.value)}
              />
            </Form.Group>
            

            <div className="float-right">
              <Button
                ref={updateElement}
                variant="primary"
                type="submit"
                onClick={onSubmit}
                className="mx-2"
              >
                Kaydet
              </Button>
              {/* <Button
                variant="primary"
                type="button"
                className="mx-2"
              >
                Güncelle
              </Button> */}
            </div>
          </Form>
        </div>
        <div className="col-md-8 m">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Proje Kodu</th>
                <th scope="col">Proje Adı</th>
                <th scope="col">Yer</th>
                <th scope="col">Alan</th>
                <th scope="col">Yüzey İşlemi</th>
                <th scope="col">Boyama Yüzey Alanı</th>
                <th scope="col">Teslim Tarihi</th>
                <th scope="col">RAL Kodu</th>
                <th scope="col">Pipe Time</th>
                <th scope="col">Node Time</th>
                <th scope="col">Point Time</th>
                <th scope="col">Pipe Dict</th>
                <th scope="col">Node Dict</th>
                <th scope="col">Pipe Point Dict</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">-</th>
                    <td>{project.attributes.code}</td>
                    <td> {project.attributes.name}</td>
                    <td>{project.attributes.location}</td>
                    <td>{project.attributes.area}</td>
                    <td>{project.attributes.surface_app}</td>
                    <td>{project.attributes.point_area}</td>
                    <td>{project.attributes.delivery_date}</td>
                    <td>{project.attributes.ral_code}</td>
                    <td>{project.attributes.pipe_time}</td>
                    <td>{project.attributes.node_time}</td>
                    <td>{project.attributes.point_time}</td>
                    <td>{project.attributes.pipe_dict}</td>
                    <td>{project.attributes.node_dict}</td>
                    <td>{project.attributes.pipe_point_dict}</td>
                    <td>
                      <i
                        className="fa fa-pencil-square text-primary d-inline"
                        aria-hidden="true"
                        onClick={() => selectProject(project.id)}
                      ></i>
                      <i
                        className="fa fa-trash-o text-danger d-inline mx-3"
                        aria-hidden="true"
                        onClick={() => onDelete(project.id)}
                      ></i>
                      <i
                        className="fa fa-wrench text-primary d-inline"
                        aria-hidden="true"
                        onClick={() => onUpdate(project.id)}
                      ></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddProject;