/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/jsx-props-no-spreading */
/** @jsx jsx */
import { jsx, Styled, Container } from 'theme-ui'
import React, {useState} from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import {Card, Box, Flex, Button} from 'rebass'
import {Input} from '@rebass/forms'
import Layout from "../layout";
import PostListing from "../components/PostListing/PostListing";
// import SEO from "../components/SEO/SEO";
import config from "../../data/SiteConfig";


const isBrowser = typeof window !== 'undefined';

const getPass = () => !isBrowser ? false: window.localStorage.getItem('password')
const setPass = (pass) => isBrowser && window.localStorage.setItem('password', pass)

const StyledCard = ({...props}) => (
  <Card
    {...props}
    sx={{
      p: [3,4],
      borderRadius: 2,
      boxShadow: '0 0 16px rgba(0, 0, 0, .25)',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      lineHeight: 2,
      minHeight: 300
}}
  />
)

const AffirmationText = ({...props}) => (
  <Styled.h2
    {...props}
    sx={{
      fontFamily: 'cursive'
}}
  />
)

const StyledButton = ({...props}) => (
  <Button
    {...props}
    sx={{
  mx: 'auto',
  mt: 4,
  display: 'block',
  width: '95%',
  // color: ''

}}
  />
)

const Index = ({...props}) => {
  const md = {...props.data.markdownRemark}
  console.log(md)
  const {affirmations, password} = props.data.markdownRemark.frontmatter;
  const [state, setstate] = useState(0)
  const currentAffirmation = affirmations[state % affirmations.length]
  const [input, setinput] = useState(getPass() || '')
  const onClick = () => setstate(state+1)
  const [isLoggedIn, setisLoggedIn] = useState(getPass() && getPass() === password)
  console.log(props, affirmations, password)
  return (
    <Layout>
      <Helmet title={config.siteTitle} />
      {/* <SEO /> */}
      <Container sx={{maxWidth: 600}}>
        {isLoggedIn ? (
          <Box minWidth={300} width='100%' mx='auto'>
            <StyledCard>
              <AffirmationText>{currentAffirmation.main}</AffirmationText> 
            </StyledCard>
            <StyledButton onClick={onClick}>New Affirmation</StyledButton>
          </Box>
): (
  <Box minWidth={300} width='100%' mx='auto'>
    <StyledCard sx={{flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center'}}>
        Please enter your secret code to get your affirmations
      <Input value={input} onChange={e => setinput(e.target.value)} />
      <StyledButton onClick={()=> {
        if (input === password){
          setPass(input)
          setisLoggedIn(true)
        }
        else {
          alert('Invalid password please try again')
        }
      }}
      >
        Submit
      </StyledButton>
    </StyledCard>
  </Box>
)}
        
      </Container>
    </Layout>
  ) 
}

export default Index;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
{
  markdownRemark(frontmatter: {name: {eq: "affirmations"}}) {
    id
    
    frontmatter {
      password
      affirmations{
        main
      }
    }
  }
}
`;
