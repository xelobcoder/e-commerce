function ProductList (props) {
  const {cat} = props;
  console.log(cat);
  return(
    <>
      <h2>classic name items</h2>
    </>
  )
}


export default ProductList;




export async function getServerSideProps(context) {
  let getcat = await fetch('http://localhost:3000/api/categories')
  let cat = await getcat.json()
  return{
    props: {
      cat
    }
  }
}