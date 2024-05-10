Feature: Create User Page Account

  Scenario: Criar usuário com sucesso
    Given acessar pagína de Create an Account
    When o formulario é submetido com os dados onde o email contera a data e hora atual para ser único
      | FirstName | LastName | Email                  | Password                     | ConfirmPassword              |
      | Galvao    | Bueno    | gb@globo.com | SBTEhMelhorqueAGloboForEv3er | SBTEhMelhorqueAGloboForEv3er |
    Then usuário deverá ser criado com sucesso

  Scenario: Criar usuário que foi cadastrado no passado
    Given acessar pagína de Create an Account
    When o formulario é submetido com os dados
      | FirstName | LastName | Email                  | Password                     | ConfirmPassword              |
      | Galvao    | Bueno    | garlvaobueno@globo.com | SBTEhMelhorqueAGloboForEv3er | SBTEhMelhorqueAGloboForEv3er |
    Then usuário não deverá ser criado e uma mensagem de erro deve ser exibida na tela 

  Scenario Outline: Criar usuario - Campos Obrigatório
    Given acessar pagína de Create an Account
    When o formulario é submetido com os dados
      | FirstName   | LastName   | Email   | Password   | ConfirmPassword   |
      | <FirstName> | <LastName> | <Email> | <Password> | <ConfirmPassword> |
    Then deverá apresentar mensagem de erro para o campo "<ErrorMessage>"

    Examples:
      | FirstName | LastName | Email           | Password | ConfirmPassword | ErrorMessage     |
      |           | Silva    | email3@abcd.com | Teste123 | Teste123        | First Name       |
      | Teste     |          | email4@abcd.com | Teste123 | Teste123        | Last Name        |
      | Teste     | Silva    |                 | Teste123 | Teste123        | Email            |
      | Teste     | Silva    | email6@abcd.com |          | Teste123        | Password         |
      | Teste     | Silva    | email7@abcd.com | Teste123 |                 | Confirm Password |
      |           |          |                 |          |                 | Missing all      |


  Scenario Outline: Criar usuario - Verificação do grau da senha
    Given acessar pagína de Create an Account
    When o formulario é submetido com os dados
      | FirstName   | LastName   | Email   | Password   | ConfirmPassword   |
      | <FirstName> | <LastName> | <Email> | <Password> | <ConfirmPassword> |
    Then deverá apresentar mensagem de erro para o campo senha "<ErrorMessage>"

    Examples:
      | FirstName | LastName | Email           | Password | ConfirmPassword | ErrorMessage    |
      | Teste     | Silva    | email7@abcd.com | Teste123 |                 | Strong Password |
      | Teste     | Silva    | email7@abcd.com | asd123AS | asd123AS        | Medium Password |
