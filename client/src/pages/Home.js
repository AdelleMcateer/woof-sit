import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'
import { getAllSitters} from '../redux/actions/sittersActions'
import { Button, Row, Col } from 'antd';
import Spinner from '../components/Spinner';


function Home() {
  const {sitters} = useSelector(state=>state.sittersReducer)
  const {loading} = useSelector(state=>state.alertsReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllSitters())
}, [])

  return (
    <DefaultLayout>

      {loading == true && (<Spinner/>)}
      
      <Row justify='center' gutter={16} className='mt-5'>

        {sitters.map(sitter=>{
          return <Col lg={5} sm={24} xs={24}>
            <div className='sitter p-2 bs1 mt-3'>
              <img src={sitter.image} className="sitterimg"/>    

                 <div className='sitter-content d-flex align-items-center justify-content-between'> 

                 <div>
                     <p>{sitter.name}</p>
                     <p>{sitter.ratePerHour}Rate Per Hour /-</p>
                   </div>

                   <div>
                     <button className='btn1 mr-2'>Book Now</button>
                   </div>

                   </div>
            </div>
            </Col>
        })}

      </Row>
  
    </DefaultLayout>
  )
}

export default Home