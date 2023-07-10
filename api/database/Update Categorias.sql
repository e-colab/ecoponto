select * from ecoponto.categoria;
select * from ecoponto.material;
select * from ecoponto.empresamaterial;

delete from ecoponto.categoria where idcategoria = 19;

select m.nome, m.qualidade, c.descricao, em.qualidade, em.objetivo
from ecoponto.empresamaterial em, ecoponto.categoria c, ecoponto.material m	
where em.categoria = c.idcategoria
and em.idprod = m.idprod
and c.idcategoria = m.categoria;

select * from ecoponto.empresa;

update ecoponto.categoria set descricao = 'Pedras, pedriscos, minério' where nomecategoria = 'PROSP_EXPL_MINAS_PEDR';
update ecoponto.categoria set descricao = 'Produtos agrícolas ou alimentos' where nomecategoria = 'AGRIC_PROC_ALIM';
update ecoponto.categoria set descricao = 'Madeira, painéis, mobiliário e papel' where nomecategoria = 'PROC_MAD_PAINEL_MOB_PAPEL';
update ecoponto.categoria set descricao = 'Produtos de couro e têxtil' where nomecategoria = 'IND_COURO_TEXTIL';
update ecoponto.categoria set descricao = 'Produtos derivados de petróleo, gás natural e carvão' where nomecategoria = 'REF_PETR_PURIF_GASNAT_TRATCARV';
update ecoponto.categoria set descricao = 'Produtos químicos inorgânicos' where nomecategoria = 'PROC_QUIM_INORG';
update ecoponto.categoria set descricao = 'Produtos químicos orgânicos' where nomecategoria = 'PROC_QUIM_ORG';
update ecoponto.categoria set descricao = 'Revestimentos (tintas, vernizes, colas vedantes)' where nomecategoria = 'REVEST_COLA_VED';
update ecoponto.categoria set descricao = 'Equipamentos fotográficos' where nomecategoria = 'IND_FOTOGRAFICA';
update ecoponto.categoria set descricao = 'Resíduo oriundo de processos térmicos' where nomecategoria = 'PROC_TERMICOS';
update ecoponto.categoria set descricao = 'Produtos químicos e revestimentos de metais' where nomecategoria = 'TRAT_QUIM_REV_METAIS';
update ecoponto.categoria set descricao = 'Metais e plásticos' where nomecategoria = 'MOLD_TRAT_MET_PLAST';
update ecoponto.categoria set descricao = 'Óleos e resíduos de combustíveis' where nomecategoria = 'OLEOS_USAD_RESID_COMB_LIQ';
update ecoponto.categoria set descricao = 'Solventes, fluídos de refrigeração e gases propulsores orgânicos' where nomecategoria = 'SOLV_FLUID_REFRIG_GAS_PROP_ORG';
update ecoponto.categoria set descricao = 'Embalagens, panos, vestuário de proteção' where nomecategoria = 'EMB_ABSORV_PANOS_MATFILTR_VESTPROT';
update ecoponto.categoria set descricao = 'Produtos de construção e demolição' where nomecategoria = 'CONSTR_DEMOLIC';
update ecoponto.categoria set descricao = 'Produtos de saúde' where nomecategoria = 'SERV_SAUDE';
update ecoponto.categoria set descricao = 'Sólidos urbanos e equipamentos (domésticos, comércio, indústria)' where nomecategoria = 'SOLID_URB_EQUIP';
