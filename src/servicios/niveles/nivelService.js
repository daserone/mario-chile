import { fetchWrapper } from '../../helpers';

const baseUrl = 'https://toolkit.maxialatam.com/bieni/controller/nivelesback.php';

export const nivelService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

function getAll() {
    return fetchWrapper.get(`${baseUrl}?op=getNiveles`);
}

function getById(id) {
    //return fetchWrapper.get(`${baseUrl}/${id}`);
    return fetchWrapper.get(`${baseUrl}?op=getNivelId&id=${id}`);
}

function create(params) {
    return fetchWrapper.post(`${baseUrl}?op=addNivel`, params);
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}?op=editNivel&id=${id}`, params);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}?op=deleteNivel&id=${id}`);
}
