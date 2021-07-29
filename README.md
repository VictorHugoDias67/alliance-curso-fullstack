# Curso de desenvolvimento Web Fullstack NodeJS + Vue.js

by Diego Yegros - Alliance

<!DOCTYPE html>

<html>
  <head>
    <title>Calculadora inútil</title>
  </head>
  <body>
    <form action="http://localhost:30080/calcular" method="POST">
      <p>
        <label for="primeiro_operando">Primeiro operando</label>
        <input name="primeiro_operando">
      </p>
      <p>
        <label for="segundo_operando">Segundo operando</label>
        <input name="segundo_operando">
      </p>
      <p>
        <label for="operador">Operador</label>
        <select name="operador">
          <option value="add">+</option>
          <option value="minus">-</option>
          <option value="mult">*</option>
          <option value="div">/</option>
        </select>
      </p>
      <p>
        <input type="submit" value="Calcular">
      </p>
    </form>
  </body>
</html>
```

```perl
#!/usr/bin/perl
use strict;
use warnings;
use CGI;

$cgi = CGI->new;
$val1 = $cgi->param(`primeiro_operando`)
$val2 = $cgi->param(`segundo_operando`)
$op = $cgi->param(`operador`)
if ($op eq "add") {
  $val1+=$val2;
} elsif ($op eq "minus") {
  $val1-=$val2;
} elsif ($op eq "mult") {
  $val1*=$val2;
} elsif ($op eq "div") {
  $val1/=$val2;
}

# Saída
print "Content-Type: text/html\n\n";
print "<html><body>\n";
print "<b>Resultado:</b><br/>\n";
print "<p>$val1</p>\n"
print "</body>\n"
print "</html>\n"
```

```perl
#!/usr/bin/perl
use strict;
use warnings;
use CGI;

$cgi = CGI->new;
$val1 = $cgi->param(`primeiro_operando`)
$res = $val1
$val2 = $cgi->param(`segundo_operando`)
$op = $cgi->param(`operador`)
if ($op eq "add") {
  $res+=$val2;
} elsif ($op eq "minus") {
  $res-=$val2;
} elsif ($op eq "mult") {
  $res*=$val2;
} elsif ($op eq "div") {
  $res/=$val2;
}

# Saída
print "Content-Type: text/html\n\n";
print "<!DOCTYPE html>\n"
print "<html>\n"
print "<head>\n"
print "<title>Calculadora inútil</title>\n"
print "</head>\n"
print "<body>\n"
print "<form action='http://localhost:30080/calcular' method="POST">\n"
print "<p>\n"
print "<label for='primeiro_operando'>Primeiro operando</label>\n"
print "<input name='primeiro_operando' value='$val1'>\n"
print "</p>\n"
print "<p>\n"
print "<label for='segundo_operando' value='$val2'>Segundo operando</label>\n"
print "<input name='segundo_operando'>\n"
print "</p>\n"
print "<p>\n"
print "<label for='operador'>Operador</label>\n"
print "<select name='operador'>\n"
print "<option value='add'>+</option>\n"
print "<option value='minus'>-</option>\n"
print "<option value='mult'>*</option>\n"
print "<option value='div'>/</option>\n"
print "</select>\n"
print "</p>\n"
print "<p>\n"
print "<input type='submit' value='Calcular'>\n"
print "</p>\n"
print "</form>\n"
print "<p>Resultado: $res</p>"
print "</body>\n"
print "</html>\n"
```
Preparando o banco de dados
Crie um novo banco de dados no PostgreSQL (loja)

CREATE DATABASE loja
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Portuguese_Brazil.1252'
    LC_CTYPE = 'Portuguese_Brazil.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

Crie uma tabela para os produtos
-- Table: public.produtos

-- DROP TABLE public.produtos;

CREATE TABLE public.produtos
(
    codigo integer NOT NULL,
    descricao character varying(80) COLLATE pg_catalog."default" NOT NULL,
    quantidade integer,
    CONSTRAINT produtos_pkey PRIMARY KEY (codigo)
)

TABLESPACE pg_default;

ALTER TABLE public.produtos
    OWNER to postgres;

COMMENT ON TABLE public.produtos
    IS 'Produtos disponiveis';

    Adiconando suporte ao PostgreSQL
Importe a biblioteca de conexão com o banco
npm install pg --save
Importe a classe Pool e configure a conexão com BD

Substitua a lógica das rotas para não usar mais a lista em memória, acessando direto o banco de dados

Referencia
Chamando um comando com parametros
const text = 'INSERT INTO users(name, email) VALUES($1, $2) RETURNING *'
const values = ['brianc', 'brian.m.carlson@gmail.com']
const res = await client.query(text, values)
console.log(res.rows[0])
Comandos SQL
INSERT INTO [tabela]([campos], ...) VALUES (valores, ...)
UPDATE [tabela] SET [campos1]=valor1, ... WHERE [campo_chave] = valor_chave
DELETE FROM [tabela] WHERE [campo_chave] = valor_chave
Tipos primitivos integer, string, bool

var i = 10, nome = "Diego"

Tipo arrays (listas) var lista = ["banana", "maca", "amora", 1, 2, 5]

Tipos dicionário var usuario = { codigo: 10, nome: "Diego", email: "dyegros@allianceconsultoria.com.br" }