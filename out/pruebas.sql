BEGIN TRY 
DROP VIEW [${BBDD_EXP}].[EXP_SFCO_CLIENTE];
END TRY BEGIN CATCH END CATCH
GO

CREATE VIEW [${BBDD_EXP}].[EXP_SFCO_CLIENTE]
AS SELECT * FROM ${BBDD_REL_SYNAPSE}.SFCO_CLIENTE_V;
GO

DELETE FROM STG_VOLCADO_CLIENTE ALL;

CREATE MULTISET TABLE STG_VOLCADO_CLIENTE
(
   columna1 INTEGER,
   ide_territorio INTEGER,
   cod_cliente VARCHAR(40),
   columna2 VARCHAR(20),
   columna3 VARCHAR(18),
   tms_carga TIMESTAMP(6)
)
PRIMARY INDEX (columna1);


DROP TABLE STG_${FECHA_LOGICA}_VOLCADO_CLIENTE;
CREATE MULTISET TABLE STG_${FECHA_LOGICA}_VOLCADO_CLIENTE
(
   columna1 INTEGER,
   ide_territorio INTEGER,
   cod_cliente VARCHAR(40),
   columna2 VARCHAR(20),
   columna3 VARCHAR(18),
   tms_carga TIMESTAMP(6)
)
PRIMARY INDEX (columna1);

INSERT INTO STG_VOLCADO_CLIENTE
SELECT *
FROM STG_${FECHA_LOGICA}_VOLCADO_CLIENTE;

COLLECT STATISTICS 
      COLUMN (columna1),
      COLUMN (columna2)
   ON STG_VOLCADO_CLIENTE
;

DROP TABLE STG_${FECHA_LOGICA}_VOLCADO_CLIENTE;

DATABASE ${BBDD_STG};