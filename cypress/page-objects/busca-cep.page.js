class BuscaCepPage {
  get tituloPagina() {
    return '#titulo_tela > h2'
  }
  get endereco() {
    return '#endereco';
  }

  get tipoCEP() {
    return '#tipoCEP';
  }

  get resultadoTituloPagina() {
    return '#mensagem-resultado'
  }


  /**
   * Busca um endereço ou cep.
   *
   * @param { Object } param
   * @param { String } param.enderecoOuCep - Informe um Endereço ou CEP.
   * @param { String } param.tipo - Informe o tipo de CEP:  Localidde/Logradouro, CEP Promocional, Caixa Postal Comunitária, Grande Usuário, Unidade Operacional ou Todos.
   */
  buscaEndereco({ enderecoOuCep, tipo }) {
    // Valor esperado
    const endereco = {
      logradouro: "Rua Miranda Leão" + tipo !== 'Grande Usuário' ? '' : ', 41Lojas Bemol',
      bairro: 'Centro',
      localidade: 'Manaus/AM',
      cep: tipo !== 'Grande Usuário' ? '69005-040' : '69005-901'
    }

    cy.get(this.endereco).type(enderecoOuCep)
    cy.get(this.tipoCEP).select(tipo)
    cy.contains("button", "Buscar").click()

    // Compara o valor da busca com o do resultado esperado.
    cy.get(this.resultadoTituloPagina)
      .should('be.visible')
      .and('have.text', 'Resultado da Busca por Endereço ou CEP')
    cy.get('tbody').find("tr").within(() => {
      const {logradouro, bairro, localidade, cep} = endereco
      const resultadoBusca = [
        {campo: logradouro, index: 0},
        {campo: bairro, index: 1},
        {campo: localidade, index: 2},
        {campo: cep, index: 3}
      ]
      resultadoBusca.forEach((item) => {
        cy.get('td').eq(item.index).should('contain.text', item.campo)
      })
    })
  }
}

export default BuscaCepPage;
