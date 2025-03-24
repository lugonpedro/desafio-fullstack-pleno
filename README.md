# Desafio Técnico – Desenvolvedor Pleno Fullstack

Bem-vindo ao desafio técnico para a vaga de Desenvolvedor Pleno Fullstack na Simplify Tecnologia! 🚀

O objetivo deste desafio é avaliar suas habilidades no desenvolvimento de aplicações fullstack, incluindo a modelagem de dados no backend e a construção de interfaces no frontend. Queremos entender como você estrutura seu código, sua lógica, organização e atenção aos detalhes.

---

## Descrição do Desafio

O desafio consiste em implementar **uma aplicação completa (backend + frontend)** que represente as funcionalidades apresentadas no layout abaixo:

🔗 [Figma](https://www.figma.com/design/erjil31vOjsCLeIFFCOqJ9/Simplify-Tecnologia%3A-Desafio-T%C3%A9cnico---Desenvolvedor-Fullstack-Pleno?node-id=27-10&t=m8woy13CNHlQtSuy-1)

![image](https://github.com/user-attachments/assets/697753d4-7d61-419a-b174-e464e8574cce)


### Funcionalidades

#### Frontend
1. **Card de Aluno (à direita):**
   - Exibe as informações de um aluno, conforme o layout:  
     - Foto  
     - Nome  
     - Status (Active, Graduated, Inactive, On Leave)  
     - Número de matrícula  
     - Curso  
     - Idade  
     - GPA
     - Barra de progresso dos créditos (porcentagem)  
   - O card deve funcionar como um **carrossel**, permitindo a navegação entre diferentes alunos (pelo menos com botões de "próximo" e "anterior").

2. **Lista de Disciplinas (à esquerda):**
   - Exibe a lista de Disciplinas **associadas ao aluno selecionado no card**.  
   - As informações exibidas devem conter:
     - Código da disciplina  
     - Nome da disciplina
     - Departamento  
     - Créditos  

#### Backend
- Modelagem das entidades (requisito mínimo):
  - **Aluno**  
    - Nome  
    - Idade  
    - Matrícula  
    - GPA  
    - Status (Active, Graduated, Inactive, On Leave)  
    - Curso
    - Progresso dos créditos (%)  
    - Foto
  - **Disciplina**  
    - Código  
    - Nome  
    - Departamento  
    - Créditos  
- Relacionamento:
  - Um **aluno** pode estar matriculado em **uma ou mais disciplinas**.  
  - Uma **disciplina** pode estar associada a **um ou mais alunos**.

#### Ações no backend (CRUD) pelo frontend
- Deve haver, no mínimo, uma **ação implementada** (criação, atualização ou remoção) para **Aluno** ou **Disciplina**.  
- Essa ação deve ser acessível a partir do frontend.
- Exemplo: um botão de "Deletar aluno" ou "Adicionar disciplina", seguindo o mesmo layout do Figma.

---

## Requisitos

### Técnicos
- **Frontend:**  
  - HTML, CSS, JavaScript (ou TypeScript)
  - Frameworks permitidos: React, Vue ou Angular

- **Backend:**  
  - Spring Boot ou Node.js (NestJS ou Express)
  - Banco de dados relacional
  - **API RESTful**

### O que será avaliado
✅ Organização e estrutura do código    
✅ Lógica de modelagem de dados    
✅ Fidelidade e usabilidade no layout do frontend    
✅ Clareza e simplicidade na solução    
✅ Documentação de como rodar o projeto    

---

## Instruções para Entrega
1. Faça um **fork** deste repositório ou crie um novo repositório público no GitHub.
2. Suba a sua implementação.
3. Documente no `README.md` como executar a aplicação (backend e frontend).

---

## Diferenciais (não obrigatórios)
✨ Responsividade no frontend  
✨ Testes automatizados no backend e/ou frontend  
✨ Implementação de filtros ou paginação na listagem de disciplinas  
✨ Criação de um docker-compose.yml para facilitar o deploy e execução da aplicação

---

## Dúvidas?
Em caso de dúvidas, entre em contato pelo e-mail.

Boa sorte! Estamos ansiosos para ver seu trabalho! 🚀  
Simplify Tecnologia
