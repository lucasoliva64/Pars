export class Festa {
    public id: string;
    public Titulo: string;
    public HorarioInicio: string;
    public HorarioFim: string;
    public DiasFuncionamento: string;
    public Descricao: string;
    public Local: string;
    public Valor: number;
    public imgCapa: string;
    public imgAvatar: string;
  
  
  
    constructor(id: string, Titulo: string, HorarioInicio: string, HorarioFim: string, DiasFuncionamento: string, Descricao: string, Local: string, Valor: number, imgCapa: string, imgAvatar: string ) {
      this.id = id;
      this.Titulo = Titulo;
      this.HorarioInicio = HorarioInicio;
      this.HorarioFim = HorarioFim;
      this.DiasFuncionamento = DiasFuncionamento;
      this.Descricao = Descricao;
      this.Local = Local;
      this.Valor = Valor;
      this.imgCapa = imgCapa;
      this.imgAvatar = imgAvatar;
    }
  }