CREATE TABLE ecoponto.empresa (
	cnpj varchar NOT NULL,
	nome varchar NOT NULL,
	email varchar NOT NULL,
	telefone varchar NOT NULL,
	funcresponsavel varchar NOT NULL,
	cep varchar NOT NULL,
	cidade varchar NOT NULL,
	estado varchar NOT NULL,
	endereco varchar NOT NULL,
	bairro varchar NOT NULL,
	numeroEndereco varchar NOT NULL,
	lat varchar NOT NULL,
	long VARCHAR NOT NULL,
	CONSTRAINT empresa_pk PRIMARY KEY (cnpj)
);

CREATE TABLE ecoponto.categoria (
	idCategoria SERIAL,
    nomeCategoria varchar NOT NULL,
	descricao varchar NULL,
	CONSTRAINT categoria_pk PRIMARY KEY (idCategoria)
);

CREATE TABLE ecoponto.material (
	idProd SERIAL,
	qualidade varchar NOT NULL,
	nome varchar NOT NULL,
	categoria integer NOT NULL,
	CONSTRAINT material_pk PRIMARY KEY (idProd,qualidade),
    CONSTRAINT categoria_fk FOREIGN KEY (categoria) REFERENCES ecoponto.categoria(idCategoria) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE ecoponto.empresamaterial (
	cnpj varchar NOT NULL,
	idProd integer NOT NULL,
	qualidade varchar NOT NULL,
	data date NOT NULL DEFAULT NOW(),
	objetivo varchar NULL,
	categoria integer NOT NULL,
    PRIMARY KEY(cnpj, idProd, qualidade, data, objetivo, categoria),
	CONSTRAINT empresamaterial_fk_cnpj FOREIGN KEY (cnpj) REFERENCES ecoponto.empresa(cnpj) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT empresamaterial_fk_prod FOREIGN KEY (idProd,qualidade) REFERENCES ecoponto.material(idProd,qualidade) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT categoria_fk FOREIGN KEY (categoria) REFERENCES ecoponto.categoria(idCategoria) ON DELETE CASCADE ON UPDATE CASCADE
);

create table ecoponto.objetivo (
	id varchar primary key,
	descricao varchar not null
);

create table ecoponto.qualidade (
	id varchar primary key,
	descricao varchar not null
);

CREATE TABLE "ecoponto".certificacoes (
	codigo varchar NOT NULL,
	nome varchar NULL,
	CONSTRAINT certificacoes_pk PRIMARY KEY (codigo)
);





CREATE TABLE "ecoponto".empresacertificacoes (
	codigocert varchar NOT NULL,
	cnpjemp varchar NOT NULL,
	CONSTRAINT empresacertificacoes_cert FOREIGN KEY (codigocert) REFERENCES "ecoponto".certificacoes(codigo) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT empresacertificacoes_cnpj FOREIGN KEY (cnpjemp) REFERENCES "ecoponto".empresa(cnpj) ON DELETE CASCADE ON UPDATE CASCADE
);

