export class Comentarios {
    public id: string;
    public nome: string;
    public comentario: string;
    public classificacao: string;
    public imagem: string;

    constructor(id: string, nome: string, comentario: string, classificacao: string, imagem: string) {
        this.id = id;
        this.nome = nome;
        this.comentario = comentario;
        this.classificacao = classificacao;
        this.imagem = imagem;
    }
}