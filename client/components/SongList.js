import gql from 'graphql-tag'
import { graphql } from 'graphql'

function SongList() {
    return (
        <div>
            SongList
        </div>
    )
}

const query = gql`
{
    songs {
        title
    }
}
`

export default graphql(query)(SongList)
