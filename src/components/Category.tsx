import { Button, useColorModeValue } from '@chakra-ui/react'

interface Props{
  category: string
}

const Category = ({category}: Props) => {
  return (
    <Button size={'xs'} rounded={'xl'} px={3} bg={useColorModeValue('brand.700', 'brand.100')} color={useColorModeValue('brand.200', 'brand.700')}>{category}</Button>
  )
}

export default Category

