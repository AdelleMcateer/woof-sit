import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Form, Input } from "antd";
import {
  addSitter,
  getAllSitters,
  editCar,
} from "../redux/actions/sittersActions";
import Spinner from "../components/Spinner";

function EditSitter({ match }) {
  const { sitters } = useSelector((state) => state.sittersReducer);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);
  const [sitter, setsitter] = useState();
  const [totalsitters, settotalsitters] = useState([]);

  useEffect(() => {
    if (sitters.length == 0) {
      dispatch(getAllSitters());
    } else {
      settotalsitters(sitters);
      setsitter(sitters.find((o) => o._id == match.params.sitterid));
      console.log(sitter);
    }
  }, [sitters]);

  function onFinish(values) {
    values._id = sitter._id;

    dispatch(EditSitter(values));
    console.log(values);
  }

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row justify="center mt-5">
        <Col lg={12} sm={24}>
          {totalsitters.length > 0 && (
            <Form
              initialValues={sitter}
              className="bs1 p-2"
              layout="vertical"
              onFinish={onFinish}
            >
              <h3>Edit Sitter</h3>
              {sitter.name}
              {sitters.length}
              <hr />
              <Form.Item
                name="name"
                label="Sitter Name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="image"
                label="Image Url"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="ratePerHour"
                label="Rate Per Hour"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="dogType"
                label="Dog Type"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="experienceLevel"
                label="Experience Level"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <div className="text-right">
                <button className="btn1">EDIT SITTER</button>
              </div>
            </Form>
          )}
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default EditSitter;
