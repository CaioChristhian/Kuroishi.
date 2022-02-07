import { Box, Divider, Flex, Heading, VStack, HStack, SimpleGrid, Button } from "@chakra-ui/react";
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from "react-query";

import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { SideBar } from "../../components/SideBar";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { useRouter } from "next/router";

type CreateUserFormData = {
  email: string;
  password: string;
}

const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('Insira um e-mail válido'),
  password: yup.string().required('Senha obrigatória').min(6, 'No mínimo 6 caracteres'),
  password_confirmation: yup.string().oneOf([
    null, yup.ref('password')
  ], 'As senhas precisam ser iguais')
})

export default function CreateUser() {
  const router = useRouter()

  const createUser = useMutation( async (user: CreateUserFormData) => {
    const response = await api.post('users', {
      user: {
        ...user,
        created_At: new Date(),
      }
    })

    return response.data.user
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
    }
  })

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserFormSchema)
  })

  const { errors } = formState;

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
    await createUser.mutateAsync(values)

    router.push('/users')
  }

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <SideBar />

        <Box 
          flex="1" 
          borderRadius={8} 
          bg="gray.800" 
          p={["6", "8"]}
          as="form"
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight="normal">Criar Usuário</Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input name="name" label="Nome Completo" {...register('name')} error={errors.name} />
              <Input name="email" type="email" label="E-mail" {...register('email')} error={errors.email} />
            </SimpleGrid>
            
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input name="password" type="password" label="Senha" {...register('password')} error={errors.password} />
              <Input name="password_confirmation" type="password" label="Confirme sua senha" {...register('password_confirmation')} error={errors.password_confirmation} />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
            <Link href='/users' passHref>
              <Button as="a" colorScheme="whiteAlpha">Cancelar</Button>
            </Link>
              <Button type="submit" colorScheme="pink" isLoading={formState.isSubmitting}>Salvar</Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}