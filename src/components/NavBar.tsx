import { Button, Flex, HStack, Image } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import SearchInput from './SearchInput'
import ColorModeSwitch from './ColorModeSwitch'
import logo from "../assets/logo.png";
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { IoMdArrowForward } from 'react-icons/io';
import GoodsGroup from './GoodsGroup';




const NavBar = () => {
  return (
      <>
          <HStack padding="10px" gap={8}>
            <Link to="/">
              <Image src={logo} boxSize="80px" objectFit="cover" borderRadius={4} />
            </Link>
            <ColorModeSwitch />
            <SearchInput
            />
            <Flex gap={2} paddingRight={{base: '0px', lg: '80px'}} paddingLeft={{base: '16px'}}>
                <Link to="/adminPanel">
                    <Button leftIcon={<IoMdArrowForward />} colorScheme='teal' variant='outline'>
                        پنل مدیریت
                    </Button>
                </Link>
                <Link to="/cart">
                    <Button leftIcon={<AiOutlineShoppingCart />} colorScheme='teal' variant='solid'>
                        سبد خرید
                    </Button>
                </Link>
            </Flex>
          </HStack>
          <GoodsGroup />
      </>
    
  )
}

export default NavBar