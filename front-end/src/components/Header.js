import React from 'react'
import { Grid, GridItem, Button } from '@chakra-ui/react'

const Header = () => {
    return (
        <Grid 
            templateColumns="repeat(2, 1fr)" 
            gap={8} 
            height="49px"
            paddingTop="13px"
            fontWeight={600}
            paddingLeft="15px"
            paddingRight="15px"
            backgroundColor="rgb(66 147 225)" 
            color="white">
            <GridItem>
                <Button color="white" variant="link">DIJKSTRA</Button>
            </GridItem>
            <GridItem >
                <div style={{ 
                    display: "inline-flex", 
                    float: "right", 
                    paddingRight: "15px" 
                }}>
                    <Button marginRight="20px" color="white" color="white" variant="link">Dashboard</Button>
                    <Button marginRight="20px" color="white" variant="link">Sign Up</Button>
                    <Button color="white" variant="link">Login</Button>
                </div>
                
            </GridItem>
        </Grid>
    )
}

export default Header
