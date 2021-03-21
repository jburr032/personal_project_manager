import React from 'react'
import { Grid, GridItem, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

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
                <Link  to="/dashboard">
                    <Button color="white" variant="link">
                        DIJKSTRA
                    </Button>
                </Link>
            </GridItem>
            <GridItem >
                <div style={{ 
                    display: "inline-flex", 
                    float: "right", 
                    paddingRight: "15px" 
                }}>
                    <Link to="/dashboard">
                        <Button 
                            marginRight="20px" 
                            color="white" 
                            color="white" 
                            variant="link">
                                Dashboard
                        </Button>
                    </Link>
                    <Link>
                        <Button 
                            marginRight="20px" 
                            color="white" 
                            variant="link">
                                Sign Up
                        </Button>
                    </Link>
                    <Link>
                        <Button 
                            color="white" 
                            variant="link">
                                Login
                        </Button>
                    </Link>
                </div>
                
            </GridItem>
        </Grid>
    )
}

export default Header
