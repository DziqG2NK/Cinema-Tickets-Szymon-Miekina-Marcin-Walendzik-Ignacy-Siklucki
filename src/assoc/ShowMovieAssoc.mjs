import { Association, AssociationTypes } from '../Association.mjs';
import ShowModel from '../model/ShowModel.mjs';
import MovieModel from '../model/MovieModel.mjs';

const ShowMovieAssoc = new Association(
    'Show<-Movie',
    {
        type: AssociationTypes.OneToMany,
        from: MovieModel,
        fromGetterField: 'shows',
        to: ShowModel,
        toGetterField: 'movie',
        field: 'movieId',
    },
);

export default ShowMovieAssoc;
