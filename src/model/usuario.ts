export class Usuario {
    public uid: string;
    public nome: string;
    public email: string;
    public senha: string;
    public status: string;
    public genero: string;
    public sobre: string;
    public imagem: string;
    public cidade: string;
  
  
    constructor(uid: string, email: string, cidade?: string, sobre?: string,  nome?: string, status?: string, genero?: string, imagem?: string ) {
      this.uid = uid;
      this.nome = nome;
      this.sobre = sobre;
      this.status = status;
      this.genero = genero;
      this.imagem = imagem;
      this.cidade = cidade;
  
    }
  }