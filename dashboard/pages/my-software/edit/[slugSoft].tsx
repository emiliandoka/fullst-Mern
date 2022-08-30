import type { NextPage } from 'next'
import Layout from '../../../components/layout';
import styles from '../../../styles/newSoftware.module.css';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useFormik } from "formik";
import {
  Grid,
  GridItem ,
  Stack ,
  Heading,
  Checkbox,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Textarea, 
  Button
} from '@chakra-ui/react'
import Link from 'next/link';
type Props={
  software : any
}
const NewSoftwarePage : NextPage<Props>  = ({software})=>{
  const router = useRouter();
  const coreFeatures: string[] = [
    'Core HR',
    'People Management',
    "ATS",
    'Payroll',
    'T/A'
  ]
  const [checkedItems, setCheckedItems] = useState([
    software.features.includes(coreFeatures[0]), 
    software.features.includes(coreFeatures[1]), 
    software.features.includes(coreFeatures[2]), 
    software.features.includes(coreFeatures[3]), 
    software.features.includes(coreFeatures[4])]
    );
  const [imgdata, setImgdata] = useState<string| null>('');
  
  const allChecked = checkedItems.every(Boolean)
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked
  const formik = useFormik({
    initialValues: {
      title: software.title ,
      overallRating : software.overallRating ,
      referallUrl: software.referallUrl ,
      description: software.description
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(imgdata));
      
      fetch('http://localhost:3002/softwares/',{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...values,
          features: [
            ...coreFeatures.filter((feature, index)=>checkedItems[index])
          ],
          imgrl : imgdata,
          updatedImage : imgdata ? true : false,
          postId : software['_id']
        })
      }).then((res)=>{
        router.push('/my-software')
      })
    },
  })

return(
  <Layout seometa={
    <>
      <title>Add a new Software</title>
      <meta name="description" content="Create a new software to publish on our main site" />
    </>
  }>
    <Heading textAlign={"center"}> Create a new Software</Heading>
    <form method='post' action='' onSubmit={formik.handleSubmit} className={styles.form} >
      <Grid templateColumns='repeat(2, 1fr)' gap={6}>
        <GridItem>
          <FormControl>
            <FormLabel>Software Name</FormLabel>
            <Input required={true} type='text' id="title" name='title' onChange={formik.handleChange} value={formik.values.title} />
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl>
            <FormLabel>Overall overallRating</FormLabel>
            <Input required={true} type='number' max='5' id='overallRating' name='overallRating' onChange={formik.handleChange} value={formik.values.overallRating} />
            <FormHelperText>Out of 5</FormHelperText>
          </FormControl>
        </GridItem>
      </Grid>

      <FormControl>
        <FormLabel>Referall Url</FormLabel>
        <Input required={true} type='text' id='referallUrl' name='referallUrl' onChange={formik.handleChange} value={formik.values.referallUrl} />
        <FormHelperText>Url to redirect software to</FormHelperText>
      </FormControl>

      <Heading as='h5'  size='lg' textAlign={"center"}> Select Core Features</Heading>
      <Checkbox
        isChecked={allChecked}
        isIndeterminate={isIndeterminate}
        onChange={(e) => setCheckedItems([e.target.checked, e.target.checked,e.target.checked, e.target.checked,e.target.checked])}
      >
        Select all
      </Checkbox>
      <Stack pl={6} mt={1} spacing={1}>

        <Checkbox
          isChecked={checkedItems[0]}
          value="Core HR"
          onChange={(e) =>{   setCheckedItems([ e.target.checked , checkedItems[1], checkedItems[2], checkedItems[3], checkedItems[4] ]) }}
        >
          Core HR
        </Checkbox>
        <Checkbox
          isChecked={checkedItems[1]}
          onChange={(e) => setCheckedItems([checkedItems[0], e.target.checked, checkedItems[2], checkedItems[3], checkedItems[4]])}
          value="People Management"
        >
          People Management
        </Checkbox>
        <Checkbox
          isChecked={checkedItems[2]}
          onChange={(e) => setCheckedItems([checkedItems[0], checkedItems[1] , e.target.checked, checkedItems[3], checkedItems[4]])}
          value="ATS"
        >
          ATS
        </Checkbox>
        <Checkbox
          isChecked={checkedItems[3]}
          onChange={(e) => setCheckedItems([checkedItems[0], checkedItems[1] ,checkedItems[2], e.target.checked, checkedItems[4]])}
          value="Payroll"
        >
          Payroll
        </Checkbox>
        <Checkbox
          isChecked={checkedItems[4]}
          onChange={(e) => setCheckedItems([checkedItems[0], checkedItems[1] ,checkedItems[2],checkedItems[3], e.target.checked])}
          value="T/A"
        >
          T/A
        </Checkbox>
      </Stack>
      <Heading as='h5'  size='md' style={{marginTop: "20px"}}> Featured Image</Heading>
      <input style={{marginTop: "20px"}} type="file" accept="image/png, image/jpeg"   id='imgurl' name='imgurl' onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
          if (evt.target.files != null) {
            const reader = new FileReader();
            reader.readAsDataURL(evt.target.files[0]);
            reader.onloadend = ()=>{
              setImgdata(reader.result as string);
            }
          }
        }}/>
        <Image src={software.imgurl.url} width={"300px"} height={"300px"} ></Image>
      <Textarea required={true} style={{marginTop: "20px"}} placeholder='A short Description about the software'   id='description' name='description' onChange={formik.handleChange} value={formik.values.description}/>
      <Link href="/my-software">
          <Button   style={{margin: "20px 20px 0 0"}}  variant='outline'  size="lg" >
            cancel
          </Button>
      </Link>
      <Button type="submit" style={{marginTop: "20px"}}  colorScheme='teal'  size="lg" >Update and Submit for review </Button>
    </form>

  </Layout>
)
}
export default NewSoftwarePage;

export async function getServerSideProps(params: any) {
  console.log(params.query.slugSoft);
 const postData = await fetch(`http://localhost:3002/softwares/${params.query.slugSoft}`,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(res =>res.json())
  .then(data=>{
    return data
  })
  return{
    props: {
      software: postData
    }
  }
}