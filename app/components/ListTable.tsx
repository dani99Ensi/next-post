

export type Item = {
    pop_user_id: number;
    first_name: string;
    last_name: string;
}

export type Props = {
    items: Item[];
}
const ListTable: React.FC<Props> = ({ items }) => {

    return (
        <div>
            {items.map((item, index) => (
                <div key={index}>
                    <h1> Pop User with id: {item.pop_user_id}</h1>
                    <p>Name: {item.first_name}</p>
                    <p>Last Name: {item.last_name}</p>
                    <p>--------------------------- </p>
                </div>
            ))}
        </div>
    )
}

export default ListTable;