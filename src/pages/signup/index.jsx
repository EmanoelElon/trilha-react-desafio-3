import React from 'react';
import { MdEmail, MdLock, MdPerson } from 'react-icons/md';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { api } from '../../services/api';

import { useForm } from "react-hook-form";

import { Container, Title, Column, Wrapper, TitleSignup, SubtitleSignup } from './styles'


const Signup = () => {

  const { control, handleSubmit, formState: { errors  } } = useForm({
    reValidateMode: 'onChange',
    mode: 'onChange',
  });

  const onSubmit = async (formData) => {
    try{
        const {data} = await api.get(`/users?email=${formData.email}&senha=${formData.senha}`);
        
        if(data.length && data[0].id){
            // navigate('/feed') 
            return
        }

        alert('Usuário ou senha inválido')
    }catch(e){
        //TODO: HOUVE UM ERRO
    }
  };

  return (<>
    <Header />
    <Container>
      <Column>
        <Title>A plataforma para você aprender com experts, dominar as principais tecnologias e entrar mais rápido nas empresas mais desejadas.
        </Title>
      </Column>
      <Column>
        <Wrapper>
          <TitleSignup>Comece agora grátis</TitleSignup>
          <SubtitleSignup>Crie sua conta e make the change._</SubtitleSignup>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input placeholder="Nome Completo" leftIcon={<MdPerson />} name="nome" control={control} />
            <Input placeholder="E-mail" leftIcon={<MdEmail />} name="email" control={control} />
            <Input type="password" placeholder="Senha" leftIcon={<MdLock />}  name="senha" control={control} />
            <Button title="Criar minha conta" variant="secondary" type="submit"/>
            
            <p>Ao clicar em "criar minha conta grátis", declaro que aceito as Políticas de Privacidade e os Termos de Uso da DIO.</p>
            <p>Já tenho conta. <a href="">Fazer login</a></p>
          </form>

        </Wrapper>
      </Column>
    </Container>
  </>)
}

export { Signup }
