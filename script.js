new Vue({
    el: '#app',
    data: {
        selectedOption: '',
        nomeContato: '',
        termoPesquisa: '',
        listaContatos: [],
        contatoEmEdicao: {
            nome: ''
        },
        indiceEdicao: -1,
        proximoId: 1
    },
    computed: {
        listaContatosFiltrados() {
            const termo = this.termoPesquisa.toLowerCase();
            return this.listaContatos.filter(contato =>
                contato.nome.toLowerCase().includes(termo)
            );
        }
    },
    methods: {
        adicionarContato: function () {
            if (this.nomeContato) {
                this.listaContatos.push({
                    id: this.proximoId,  
                    nome: this.nomeContato,
                });
                this.nomeContato = '';
                this.proximoId++;  
            }
        },
        editarContato: function (index) {
            // Define o contato em edição e o índice de edição
            this.contatoEmEdicao = { ...this.listaContatos[index] };
            this.indiceEdicao = index;

            // Exibe o modal de edição
            $('#editarModal').modal('show');
        },
        salvarEdicao: function () {
            if (this.indiceEdicao >= 0) {
                // Atualiza o contato na lista com os dados editados
                this.listaContatos.splice(this.indiceEdicao, 1, this.contatoEmEdicao);
                this.cancelarEdicao();
            }

            // Fecha o modal de edição
            $('#editarModal').modal('hide');
        },
        cancelarEdicao: function () {
            // Limpa os dados de edição
            this.contatoEmEdicao = {
                nome: '',
            };
            this.indiceEdicao = -1;

            // Fecha o modal de edição
            $('#editarModal').modal('hide');
        },
        deletarContato: function (index) {
            if (confirm('Tem certeza que deseja deletar este contato?')) {
                this.listaContatos.splice(index, 1);
            }
        },
        resetarFila(){
            this.listaContatos = []
        }
    }
});
