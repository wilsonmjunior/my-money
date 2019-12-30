import useModel from "./useModel"

const { useGet, usePatch, usePost, useDelete } = useModel()

export const useMes = (data) => {
  const infoMes = useGet(`meses/${data}`)
  const [patchData, alterarMes] = usePatch(`meses/${data}`)

  return {
    infoMes,
    alterarMes
  }
}

export const useMovimentacao = (data) => {
  const movimentacoes = useGet(`movimentacoes/${data}`)
  const [postData, adicionarMovimentacao] = usePost(`movimentacoes/${data}`)
  const [removeData, removerMovimentacao] = useDelete(`movimentacoes/${data}`)

  return {
    movimentacoes,
    adicionarMovimentacao,
    removerMovimentacao
  }
}