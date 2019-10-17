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
import addToMailchimp from 'gatsby-plugin-mailchimp'
import Layout from "../layout";
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
      minHeight: 300,
      backgroundColor: '#fff'
}}
  />
)

const AffirmationText = ({...props}) => (
  <Styled.h2
    {...props}
    sx={{
      // fontFamily: 'cursive'
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
  color: 'white'

}}
  />
)

const Index = ({...props}) => {
  const md = {...props.data.markdownRemark}
  const {affirmations, password} = props.data.markdownRemark.frontmatter;
  const [state, setstate] = useState(0)
  const currentAffirmation = affirmations[state % affirmations.length]
  const [input, setinput] = useState(getPass() || '')
  const onClick = () => setstate(state+1)
  const [isLoggedIn, setisLoggedIn] = useState(getPass() && getPass() === password)
  const [email, setemail] = useState('')
  return (
    <Layout>
      <Helmet title={config.siteTitle} />
      {/* <SEO /> */}
      <Container sx={{
        maxWidth: 600,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        height: '100vh'
      }}>
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
        Enter
      </StyledButton>
      <Box mt={2}>
        Don't have your code yet? Sign up now to get your free access code!
        <Input name='email' value={email} onChange={e => setemail(e.target.value)} placeholder='yourname@email.com' />
        <StyledButton onClick={() => {
          addToMailChimp(email).then(
            () => alert(`success! Check your email: ${email} for your entry code`)
          )
          
        }}
        >
Sign up

        </StyledButton>
      </Box>
    </StyledCard>
  </Box>
)}
        <Box mx="auto">
          <Styled.h1 as={Styled.h4} sx={{mx: 'auto', width:'fit-content'}}>
            This app is brought to you by 
            {' '}
            <a href="https://teresakeever.com" alt="Teresa Keever's site">Teresa Keever</a>
          </Styled.h1>
        </Box>
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
