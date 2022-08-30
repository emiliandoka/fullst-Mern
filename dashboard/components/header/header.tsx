import {
  Drawer,
  DrawerBody,
  Button,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Avatar
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons'
import React from 'react';
import { useDisclosure } from '@chakra-ui/react';
import styles from './header.module.css';
import Link from 'next/link';
const Header = ()=>{
  const { isOpen, onOpen, onClose } = useDisclosure()
  const inputRef = React.useRef<HTMLButtonElement>(null);
  return (
    <header className={styles.header}>
      <Button className={styles.buttonDrawer} ref={inputRef} colorScheme='teal' onClick={onOpen}>
        <HamburgerIcon w={"28px"} h={"28px"} color="gray.700"/>
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={inputRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>My Account
            <div style={{display: 'flex', alignItems: 'center', gap: '15px', marginTop: '25px'}}>
              <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
              <Link href='/my-account'>
                <a >Emiljano</a>
              </Link>
            </div>
          </DrawerHeader>

          <DrawerBody
           display="flex" alignItems="center" justifyContent="space-between"
          >
            <ul className={styles.List}>
              <li style={{listStyle:'none'}}>
                <Link href="/">
                  <a >Home</a>
                </Link>        
              </li>
              <li style={{listStyle:'none'}}>
                <Link href="/my-software">
                  <a >My Software</a>
                </Link>
              </li>
              <li style={{listStyle:'none'}}>
                <Link href="/new-software">
                  <a >Add Software</a>
                </Link>
              </li>
            </ul>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </header>
  )
}

export default Header ;