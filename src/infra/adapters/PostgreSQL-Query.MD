# Postgres Query Adapter

Esta configuração fornece uma maneira simplificada e segura de criar queries SQL para o PostgreSQL usando TypeScript.

## Uso
### Exemplo de uso

```
import { PostgresQueryAdapter } from 'postgres-query-adapter';

const selectQuery = PostgresQueryAdapter.find({
  table: 'users',
  fields: [{ name: 'id' }, { name: 'name' }]
});

console.log(selectQuery);
```

- Veja como usar de todas as maneiras nos testes: delete-query-util.spec.ts, find-query-util.spec.ts, insert-query-util.spec.ts, update-query-util.spec.ts


## Funcionalidades

### `find`
- Gera uma query SELECT.

### `insert`
- Gera uma query INSERT.

### `update`
- Gera uma query UPDATE.

### `delete`
- Gera uma query DELETE.

# Contribuindo
- Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.