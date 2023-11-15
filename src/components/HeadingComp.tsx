import { Heading } from '@chakra-ui/react'
import categories from '../constants/categories'

interface Props{
  selectedCategory: number
}

const HeadingComp = ({selectedCategory}: Props) => {
  return (
    <Heading>
      {categories[selectedCategory-1]||"Your"} notes
    </Heading>
  )
}

export default HeadingComp