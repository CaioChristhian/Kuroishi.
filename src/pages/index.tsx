import { Flex, Button, Stack, Text, Link } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '../components/Form/Input';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type SignInFormData = {
  email: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('Insira um e-mail válido'),
  password: yup.string().required('Senha obrigatória'),
})

export default function SignIn() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema)
  })

  const { errors } = formState

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    await new Promise(resolve => setTimeout(resolve, 1000))

    console.log(values)

  }

  return (
    <Flex 
      w="100vw" 
      h="100vh" 
      alignItems="center" 
      justifyContent="center"
    >
      <Flex 
        as="form" 
        width="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >

      <Text  
        fontSize="3xl"
        fontWeight="bold"
        letterSpacing="tight"
        w="50"
        color="#01C38D"
        mb="8"
        alignSelf="center"
      >
        Kuroishi
        <Text color="pink.500" as="span" ml="1">.</Text>
      </Text>

      <Stack>
        <Input 
          type="email"
          name="email"
          label="E-mail"
          {...register('email')}
          error={errors.email}
        />

        <Input 
          type="password"
          name="password"
          label="Senha"
          {...register('password')}
          error={errors.password}
        />
      </Stack>

        <Button
          type="submit"
          mt="6"
          color="white"
          background="#097959"
          size="lg"
          _hover={{ background: "#0b7053" }}
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>

        
          <Stack direction="row" justify="space-between" mt="12">
            <Link href="#" color="#055c43" _hover={{ textDecoration:"none", color: "#0b7053" }} fontSize="15">
              <Text>
                Cadastre-se
              </Text>
            </Link>

            <Link href="#" color="#055c43" _hover={{ textDecoration:"none", color: "#0b7053" }} fontSize="14">
              <Text>
                Esqueceu sua senha?
              </Text>
            </Link>

          </Stack>

      </Flex>
    </Flex>
  )
}
