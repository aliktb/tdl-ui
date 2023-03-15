import FirstUser from "./FirstUser";

const SecretPage = () => {
    return (<><h3>You can only see me if authenticated!</h3>
    <FirstUser/>
    </>);
}
 
export default SecretPage;