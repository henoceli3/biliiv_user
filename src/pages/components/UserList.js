import { DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  Center,
  Flex,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const UserList = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState([]);
  useEffect(() => {
    axios
      .get(`https://user-api-pearl.vercel.app/api/user/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setUser(response.data.data);
      })
      .catch((error) => {});
  });

  function deleteUser(id) {
    axios
      .delete(`https://user-api-pearl.vercel.app/api/user/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.error(
          "Une erreur s'est produite lors de la suppression de l'utilisateur :",
          error
        );
      });
  }

  const [data, setData] = useState({
    nom: "",
    prenom: "",
    telephone: "",
    fritte_alloco: 0,
    mdp: "",
  });
  const { nom, prenom, telephone, mdp } = data;
  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const CreateUser = async () => {
    try {
      const response = await axios.post(
        `https://user-api-pearl.vercel.app/api/user`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
      onClose();
      setData({
        nom: "",
        prenom: "",
        telephone: "",
        mdp: "",
      });
    } catch (error) {
      console.log(error);
      onClose();
    }
  };

  let navigate = useRouter();
  const routeChange = (userId) => {
    let path = `/components/HomeUser/?id=${userId}`;
    navigate.push(path);
  };
  return (
    <>
      <Center w={"100%"} h={"100vh"} bg={"blue.200"}>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modifier vos information</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack spacing={3}>
                <Input
                  placeholder="nom"
                  name="nom"
                  value={nom}
                  onChange={changeHandler}
                  size="lg"
                />
                <Input
                  placeholder="prenom"
                  name="prenom"
                  value={prenom}
                  onChange={changeHandler}
                  size="lg"
                />
                <Input
                  placeholder="telephone"
                  name="telephone"
                  value={telephone}
                  onChange={changeHandler}
                  size="lg"
                />
                <Input
                  placeholder="mot de passe"
                  type="mdp"
                  name="mdp"
                  value={mdp}
                  onChange={changeHandler}
                  size="lg"
                />
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => {
                  onClose();
                }}
              >
                Ferme
              </Button>
              <Button
                bg={"#fca311"}
                mr={3}
                onClick={() => {
                  CreateUser();
                  onClose();
                }}
              >
                Créer
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            <TableCaption>Imperial to metric conversion factors</TableCaption>
            <Thead>
              <Tr>
                <Th textAlign={"center"}>Id</Th>
                <Th textAlign={"center"}>Nom</Th>
                <Th textAlign={"center"}>Prenom</Th>
                <Th textAlign={"center"}>Contact</Th>
                <Th textAlign={"center"}>Prefference</Th>
                <Th textAlign={"center"}>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {user.map((user) => (
                <Tr
                  key={user.id}
                  onClick={() => {
                    routeChange(user.id);
                  }}
                  cursor={"pointer"}
                >
                  <Td textAlign={"center"}>{user.id}</Td>
                  <Td textAlign={"center"}>{user.nom}</Td>
                  <Td textAlign={"center"}>{user.prenom}</Td>
                  <Td textAlign={"center"}>{user.telephone}</Td>
                  <Td textAlign={"center"}>{user.fritte_alloco}</Td>
                  <Td textAlign={"center"}>
                    <Icon
                      as={DeleteIcon}
                      cursor={"pointer"}
                      onClick={() => {
                        deleteUser(user.id);
                      }}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot display={"flex"} justifyContent={"right"} alignItems={"end"}>
              <Button bg={"#fca311"} onClick={onOpen}>Cree un user</Button>
            </Tfoot>
          </Table>
        </TableContainer>
      </Center>
    </>
  );
};

export default UserList;
