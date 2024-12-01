import request from 'supertest';
import app from '../../app'; 


describe('Testes de Unidade - Cadastro de Usuário', () => {
    it('Deve aceitar cadastro com dados válidos', async () => {
      const response = await request(app)
        .post('/users/')
        .send({
          nome: 'Usuário Válido',
          email: 'valido@gmail.com',
          password: 'SenhaForte123',
        });
  
      expect(response.status).toBe(200); 
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('nome', 'Usuário Válido');
      expect(response.body).toHaveProperty('email', 'valido@gmail.com');
    });
  
    it('Deve realizar login com credenciais corretas', async () => {
      const response = await request(app)
        .post('/login/')
        .send({
          email: 'valido@gmail.com',
          password: 'SenhaForte123',
        });
  
      expect(response.status).toBe(200); 
      expect(response.body).toHaveProperty('token');
      expect(response.body.user).toHaveProperty('email', 'valido@gmail.com');
    });
  });
  
  describe('Testes de Limites - Cadastro de Usuário', () => {
    it('Não deve aceitar cadastro com email duplicado', async () => {
      await request(app)
        .post('/users/')
        .send({
          nome: 'Usuário Válido',
          email: 'duplicado@gmail.com',
          password: 'SenhaForte123',
        });
  
      const response = await request(app)
        .post('/users/')
        .send({
          nome: 'Outro Usuário',
          email: 'duplicado@gmail.com',
          password: 'OutraSenha123',
        });
  
      expect(response.status).toBe(400); 
      expect(response.body.errors).toContainEqual(expect.stringMatching(/E-mail já existente!/i));
    });
  
    it('Não deve aceitar cadastro com email inválido', async () => {
      const response = await request(app)
        .post('/users/')
        .send({
          nome: 'Teste E-mail Inválido',
          email: 'emailinvalido',
          password: 'Senha1234',
        });
  
      expect(response.status).toBe(400); 
      expect(response.body.errors).toContainEqual(expect.stringMatching(/E-mail inválido!/i));
    });
  
    it('Não deve aceitar cadastro com senha curta', async () => {
      const response = await request(app)
        .post('/users/')
        .send({
          nome: 'Senha Curta',
          email: 'testesenhacurta@gmail.com',
          password: '123',
        });
  
      expect(response.status).toBe(400); 
      expect(response.body.errors).toContainEqual(expect.stringMatching(/Senha deve ter no minimo 6 catacteres!/i));
    });
  });
