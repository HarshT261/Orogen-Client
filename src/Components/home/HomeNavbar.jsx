import React from 'react'
import { Box, Flex, HStack, Link as ChakraLink, Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router'
import { navLinks } from './content'
import { navStyles } from '../../styles/homeStyles'
import BrandLogo from '../theme/BrandLogo'
import { useAuth } from '../../context/AuthContext'

const HomeNavbar = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <Flex as="nav" {...navStyles.wrapper}>
      <Box {...navStyles.brandLink}>
        <BrandLogo href="#top" />
      </Box>

      <HStack spacing={{ base: 4, md: 8 }}>
        <HStack as="ul" {...navStyles.linkList} spacing={{ base: 4, md: 6 }}>
          {navLinks.map((item) => (
            <Box as="li" key={item.href} listStyleType="none">
              <ChakraLink href={item.href} {...navStyles.link}>
                {item.label}
              </ChakraLink>
            </Box>
          ))}
        </HStack>

        {user ? (
          <Button
            size="sm"
            bg="linear-gradient(135deg, #e8b978 0%, #c49450 100%)"
            color="#0b1512"
            fontWeight="700"
            borderRadius="full"
            px={5}
            _hover={{ bg: 'linear-gradient(135deg, #f5cc8a 0%, #d8a25c 100%)', transform: 'translateY(-1px)' }}
            onClick={() => navigate(['admin', 'superadmin'].includes(user.role) ? '/admin' : '/dashboard')}
          >
            Dashboard
          </Button>
        ) : (
          <HStack spacing={2.5}>
            <Button
              size="sm"
              variant="ghost"
              color="#e8b978"
              fontWeight="600"
              _hover={{ bg: 'rgba(232, 185, 120, 0.15)' }}
              onClick={() => navigate('/login')}
            >
              Sign In
            </Button>
            <Button
              size="sm"
              bg="linear-gradient(135deg, #e8b978 0%, #c49450 100%)"
              color="#0b1512"
              fontWeight="700"
              borderRadius="full"
              px={4}
              boxShadow="0 4px 14px rgba(232, 185, 120, 0.2)"
              _hover={{ bg: 'linear-gradient(135deg, #f5cc8a 0%, #d8a25c 100%)', transform: 'translateY(-1px)' }}
              onClick={() => navigate('/signup')}
            >
              Create Account
            </Button>
          </HStack>
        )}
      </HStack>
    </Flex>
  )
}

export default HomeNavbar
