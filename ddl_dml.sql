ROLLBACK;
BEGIN;
 
  drop TABLE if exists public.emprestimo;
  drop TABLE if exists public.livro;
  drop TABLE if exists public.autor;  
  drop TABLE if exists public.situacao;
  drop TABLE if exists public.usuario;
  
commit;


ROLLBACK;
begin;

CREATE TABLE public.usuario
(
    id         serial NOT NULL,    
    nome       character varying(100) NOT NULL,
    username   character varying(20) NOT NULL,
    password   character varying(30) NOT NULL,
	UNIQUE(username),
    PRIMARY KEY (id)
);

CREATE TABLE public.autor
(
    id       serial NOT NULL,
    nome     character varying(255),          
	PRIMARY KEY (id)
);

CREATE TABLE public.situacao
(
    id        serial NOT NULL,
    descricao character varying(255),          
	PRIMARY KEY (id)
);

CREATE TABLE public.livro
(
    id       serial NOT NULL,
    id_autor integer, 
    titulo   character varying(255),     
	PRIMARY KEY (id)
);

ALTER TABLE livro ADD CONSTRAINT livro_fk FOREIGN KEY (id_autor) REFERENCES autor (id);

CREATE TABLE public.emprestimo
(
    id           serial NOT NULL,
    id_usuario   integer, 
    id_livro     integer, 
    id_situacao  integer,             
    dt_retirada  timestamp,
    dt_devolucao_prevista timestamp,
    dt_entrega   timestamp,    
	PRIMARY KEY (id)
);

ALTER TABLE emprestimo ADD CONSTRAINT usuario_fk   FOREIGN KEY (id_usuario)    REFERENCES usuario (id);
ALTER TABLE emprestimo ADD CONSTRAINT livro_fk     FOREIGN KEY (id_livro)      REFERENCES livro (id);
ALTER TABLE emprestimo ADD CONSTRAINT situacao_fk  FOREIGN KEY (id_situacao)   REFERENCES situacao (id);
commit;
 


ROLLBACK;
begin;

insert into public.usuario (nome,username,password) values ('Rafael Porcino','porcino','senha');
insert into public.usuario (nome,username,password) values ('Rogerio Silva ','silva','senha');

insert into public.situacao (descricao) values ('Disponivel');
insert into public.situacao (descricao) values ('Indisponivel');

insert into public.autor (id,nome) values (1,'Machado de Assis');
insert into public.autor (id,nome) values (2,'Joaquim Manuel de Macedo'); 

insert into public.livro (id_autor,titulo) values (1,'DOM CASMURRO');
insert into public.livro (id_autor,titulo) values (1,'MEMÓRIAS PÓSTUMAS DE BRÁS CUBAS');
insert into public.livro (id_autor,titulo) values (2,'A Moreninha');
insert into public.livro (id_autor,titulo) values (2,'O Primo da California');


insert into emprestimo (id_usuario,id_livro,id_situacao,dt_retirada,dt_devolucao_prevista,dt_entrega) 
                values (1,1,1,'20/11/2022','21/11/2022','22/11/2022');   

insert into emprestimo (id_usuario,id_livro,id_situacao,dt_retirada,dt_devolucao_prevista,dt_entrega) 
                values (1,2,1,'22/11/2022','23/11/2022','24/11/2022');   

insert into emprestimo (id_usuario,id_livro,id_situacao,dt_retirada,dt_devolucao_prevista,dt_entrega) 
                values (1,3,1,'25/11/2022','26/11/2022','27/11/2022');   


commit;

