import { useMutation } from '@apollo/client';
import { DeleteOutlined } from '@ant-design/icons';
import { GET_PEOPLE, REMOVE_PERSON, REMOVE_CAR } from "../../queries";
import { filter } from "lodash";

const RemovePerson = (props) => {
  const { id } = props
  let removedCars = props.ownCars;
  
  const [removeCar] = useMutation(REMOVE_CAR);
  const [removePerson] = useMutation(REMOVE_PERSON, {
    update(cache, { data: { removePerson } }) {
      const { people } = cache.readQuery({ query: GET_PEOPLE });
      cache.writeQuery({
        query: GET_PEOPLE,
        data: {
          people: filter(people, (c) => c.id !== removePerson.id),
        },
      });
    },
  });


  const handleButtonClick = ()=> {
    let result = window.confirm('Are you sure you want to remove this person and their cars?')
    if (result) {
      removePerson({
        variables: {
          id
        }
      })
      for(let i=0; i<removedCars.length; i++) {
        removeCar({
          variables: {
            id: removedCars[i].id
          }
        })
      }
    }
  }
  return (
    <DeleteOutlined
      key='Delete'
      onClick={handleButtonClick}
      style={{ color: 'red' }}
     />
  )
}

export default RemovePerson;