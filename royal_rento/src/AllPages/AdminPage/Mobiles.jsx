import React, { useEffect } from 'react'
import { Grid, GridItem, Input, FormLabel, Button, Heading, SimpleGrid, Alert } from '@chakra-ui/react';
import { useState, useContext } from 'react';
import axios from 'axios'
import { Navigate } from 'react-router-dom';
// import { authState } from '../Contexts/AuthContext';
import {Link as Goto} from 'react-router-dom'
import {CompExample,AddingStatus} from './Alert';

function Mobiles(){

    // Mobiles Functionality
    const [fData,setData] = useState({'tenure':'','brandName':'', 'price':'', 'imageUrl':''});
    const [final,setFinal] = useState([]);
    console.log('final:', final)
    const [deleteId,setId] = useState('');
    const [visible,setVisble] = useState(false);
    const [visibleAdd,setVisbleAdd] = useState(false);

    console.log('visible:', visible)

    // console.log('deleteId:', deleteId)
        
    const hanldeSubmit=(e)=>{
      e.preventDefault();
      axios.post(`http://localhost:8080/mobiles`,{
        ...fData
      }).then((res)=>{
        fetchMobData()
        setData({'tenure':'','brandName':'', 'price':'', 'imageUrl':''})
        setVisbleAdd(!visibleAdd);
      })
    }

    useEffect(()=>{
      fetchMobData()
    },[])

    const fetchMobData=()=>{
      axios.get(`http://localhost:8080/mobiles`)
      .then((res)=>setFinal(res.data) );}

    const handleDelete=(e)=>{
      e.preventDefault();
      axios.delete(`http://localhost:8080/mobiles/${deleteId}`)
      .then((res)=>{
        console.log('res:', res)
        fetchMobData() 
        if(res.status == 200){
        setVisble(!visible);
        setId('')
        }
    });
        
      }

 return(
         <div>
            {/* Mobile Products */}
         <Grid templateColumns={['repeat(1, 1fr)','repeat(2, 1fr)','repeat(3, 1fr)']} gap={6} padding='3% 10% 3% 10%' >
        <GridItem  boxShadow= 'rgba(0, 0, 0, 0.35) 0px 5px 15px' padding={'15%'} borderRadius={'25px'}>
          <Heading fontSize={'19px'} color={'grey'}>Add Mobile Products Here</Heading>
          <hr />
          <br />
        <form onSubmit={hanldeSubmit} >
        <FormLabel>Brand Name</FormLabel>
        <Input type='text' placeholder='Enter The Brand Name' onChange={(e)=>setData({...fData, brandName: e.target.value})} value={fData.brandName} />
        <FormLabel>Price </FormLabel>
        <Input type='number' placeholder='Enter The Price' onChange={(e)=>setData({...fData, price: e.target.value})} value={fData.price} />
        <FormLabel>Image </FormLabel>
        <Input type='text' placeholder='Image Address' onChange={(e)=>setData({...fData, imageUrl: e.target.value})} value={fData.imageUrl} />
        <FormLabel>Product Tenure</FormLabel>
        <Input type='number' placeholder='Enter The Product Name' onChange={(e)=>setData({...fData, tenure: e.target.value})} value={fData.name} />
        <br />
        <br />
        <Button type='submit'>Add Mobiles</Button>
        <br />
        <br />
        {visibleAdd?<AddingStatus visibleAdd={visibleAdd} setVisbleAdd={setVisbleAdd}/>:''}
        </form>
        </GridItem>

        <GridItem boxShadow= 'rgba(0, 0, 0, 0.35) 0px 5px 15px' padding={'15%'} borderRadius={'25px'}>
         <Heading fontSize={'19px'} color={'grey'}>Delete Mobile Products Here</Heading>
          <hr />
          <br />
          {/*  */}
         <form onSubmit={handleDelete}> 
         <FormLabel>Product ID </FormLabel>
          <Input type='number' placeholder='Enter The Product ID' value={deleteId} onChange={(e)=>setId(e.target.value)} />
          {/* <FormLabel>Product Name</FormLabel>
        <Input type='text' placeholder='Enter The Product Name' onChange={(e)=> e.target.value} /> */}
          <br />
          <br />
            {/* <CompExample/> */}
           <Button type='submit'>Delete Mobiles</Button>
           <br />
           {visible?<CompExample setVisble={setVisble} visible={visible}/>:''}
        </form>
        </GridItem>

        {/* <GridItem boxShadow= 'rgba(0, 0, 0, 0.35) 0px 5px 15px' padding={'15%'} borderRadius={'25px'}>
          <Heading fontSize={'19px'} color={'grey'}>Update Products Here</Heading>
          <hr />
          <br />
        <form onSubmit={hanldeSubmit} >
        <FormLabel>Product Name</FormLabel>
        <Input type='text' placeholder='Update The Product Name'  />
        <FormLabel>Brand Name</FormLabel>
        <Input type='text' placeholder='Update The Brand Name' />
        <FormLabel>Price </FormLabel>
        <Input type='number' placeholder='Update The Price' />
        <FormLabel>Image </FormLabel>
        <Input type='text' placeholder='Update Image Address' />
        <br />
        <br />
        <Button type='submit'>Update Products</Button>
        </form>
        </GridItem> */}


        <GridItem >
           <FormLabel>Total No. of Products : <Button>{final.length}</Button></FormLabel>
        </GridItem>
        {/* {final?.map((el)=>(
          
          <Center py={6}>
         <Box width={'30%'}
           maxW={'300px'}
           w={'full'}
           boxShadow={'2xl'}
           rounded={'md'}
           p={6}
           overflow={'hidden'}>
           <Box
             h={'300px'}
             bg={'gray.100'}
             mt={-6}
             mx={-6}
             mb={6}
             pos={'relative'}>
             <Image height='300px' width='100%'
             src={el.imageUrl}
             />
           </Box>
           <Stack>
           <Text color='gray.700'
               fontSize={'2xl'}
               fontFamily={'body'}>{el.brandName}</Text>
               <Text color={'gray.500'}>{el.name}</Text>
               <Text color={'gray.500'}>₹ {el.price}</Text>
               </Stack>
               </Box>
               </Center>
 ))} */}

         </Grid>
         </div>
 )
}

export default Mobiles