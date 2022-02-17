import React from 'react'
import { Row, Col, Form, Input} from 'antd'
import { Link } from 'react-router-dom'

function Login() {
  return (
    <div className='login'>

        <Row gutter={16} className='d-flex aligh-items-center' >

          <Col lg={16} style={{positon: 'relative'}}>
            <img src='https://cdn.pixabay.com/photo/2019/04/10/23/51/dog-4118585_960_720.jpg'></img>
            <h1 className='login-logo'>Woof Doggy Day Care</h1>
          </Col>
          <Col lg={8} className='text-left p-5'>
          <Form layout='vertical' className='login-form p-5'>
            <h1>Login</h1>
            <hr />
            <Form.Item name='username' label='Username' rules={[{required: true}]}>
              <Input></Input>
            </Form.Item>
            <Form.Item name='password' label='Password' rules={[{required: true}]}>
              <Input></Input>
            </Form.Item>

            <button className='btn1 mt-2 mb-3'>Login</button>
            <br />
            <Link to='/register'>Click here to Register</Link>
            
          </Form>
          </Col>

        </Row>

    </div>
  )
}

export default Login