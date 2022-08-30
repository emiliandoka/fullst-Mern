import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import {
  Grid,
  GridItem ,
  Heading,
  Button,
  Avatar,
  Text,
} from '@chakra-ui/react';

import { ViewIcon , EditIcon , DeleteIcon, PlusSquareIcon } from '@chakra-ui/icons';
import Layout from '../../components/layout';

type Props={
  softwares : any
}
const MySoftwarePage : NextPage<Props> = ({softwares})=>{
  const router = useRouter()
  const deleteSoft = (softSlug: string)=>{
    fetch(`http://localhost:3002/softwares/${softSlug}`,{
      method: 'DELETE', 
    }).then(res=>{
      console.log(res);
      
      if(res.status === 200){
        router.reload();
      }else{
        console.log('error deleting software');
      }
    })
  }
return(
  <Layout seometa={
    <>
      <title>My Software List</title>
      <meta name="description" content="View All your created softwares" />
    </>
  }>
  <Heading textAlign={'center'}>
    My software
  </Heading>
  <div style={{margin: '29px 0 35px 0', textAlign: 'center'}}>
      <Button colorScheme='teal' size="lg" onClick={()=>{router.push('/new-software')}}>
        <PlusSquareIcon/> &nbsp; Add a new Software
      </Button>
  </div>    
  {
    softwares.map((software: { imgurl: { url: string }; title: string; status: string ; softSlug: string ;})=>(
    <Grid key={software.softSlug} style={{maxWidth:'800px', margin: 'auto'}} alignItems="center" gridTemplateColumns="1fr 2fr 1fr">
        <GridItem display={'flex'}  marginTop="30px" alignItems="center" gap="10px">
            <Avatar src={software.imgurl.url}/>
            <Heading size="sm" color='#475569'> {software.title} </Heading>
        </GridItem>
        <GridItem textAlign="center"  marginTop="30px">
            Status : {software.status === 'pending' ? <span style={{color: '#E67E22'}}>pending</span> : <span  style={{color: '#117A65'}}>Published</span>}
        </GridItem>
        <GridItem  marginTop="30px" style={{display: 'flex', gap : '14px'}} >
          {software.status != 'pending' && <Button variant='outline'>
            <ViewIcon/>&nbsp; View
          </Button>
          }
          <Button variant='outline' colorScheme='teal' onClick={()=>{router.push(`my-software/edit/${software.softSlug}`)}}>
            <EditIcon/>&nbsp; Edit
          </Button>
          <Button variant='outline' colorScheme='red' onClick={()=>{deleteSoft(software.softSlug)}}>
            <DeleteIcon/>&nbsp; Delete
          </Button>
        </GridItem>
  </Grid>
      ))
    }
  </Layout>
)
}
export default MySoftwarePage;

export async function getServerSideProps() {
 const postData = await fetch('http://localhost:3002/softwares?creatorId=dsgswdadwags',{
    method: 'GET'
  }).then(res =>res.json())
  .then(data=>{
    return data
  })
  return{
    props: {
      softwares: postData
    }
  }
}