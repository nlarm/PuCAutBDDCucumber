Feature: Create User

  Scenario: Criar usuário com sucesso
    Given acessar pagína de Create an Account
    When o formulario é submetido com os dados
      | FirstName | LastName | Email                  | Password                     | ConfirmPassword              |
      | Galvao    | Bueno    | garlvaobueno@globo.com | SBTEhMelhorqueAGloboForEv3er | SBTEhMelhorqueAGloboForEv3er |
    Then usuário deverá ser criado com erro

   