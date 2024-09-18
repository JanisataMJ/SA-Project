import { StudentInterface } from "../../interfaces/Student";
import { SignInStudentInterface } from "../../interfaces/SignInStudent";
import { SignInAdminInterface } from "../../interfaces/SignInAdmin";
import { PersonalInterface } from "../../interfaces/Personal";
import { PersonalDetailInterface } from "../../interfaces/PersonalDetails";
import { SlipInterface } from "../../interfaces/Slip";
import { RepairInterface } from "../../interfaces/repairing";
import { ResigningFormInterface } from "../../interfaces/ResigningForm";
import { DelayedPaymentFormInterface } from "../../interfaces/delayedpaymentform";
import { En_ExitingFormInterface } from "../../interfaces/En_ExitingForm";
import { AnnouncementInterface } from "../../interfaces/Announcement";
import { AadminInterface } from "../../interfaces/Admin";

import { DormInterface } from "../../interfaces/Dorm";
import { RoomInterface } from "../../interfaces/Room";
import { ReservationInterface } from "../../interfaces/Reservation";
import axios from "axios";

const apiUrl = "http://localhost:8000";

const Authorization = localStorage.getItem("token");
const Bearer = localStorage.getItem("token_type");
const requestOptions = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `${Bearer} ${Authorization}`,
  },
};


async function SignInStudent(data: SignInStudentInterface) {
  return await axios
    .post(`${apiUrl}/signin`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
async function SignInAdmin(data: SignInAdminInterface) {
  return await axios
    .post(`${apiUrl}/signin-admin`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
async function ListStudents() {
  return await axios
    .get(`${apiUrl}/list-student`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
async function GetStudentsById(id: string) {
  return await axios
    .get(`${apiUrl}/get-student/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
async function UpdateStudentsById(id: string, data: StudentInterface) {
  return await axios
    .put(`${apiUrl}/update-student/${id}`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
async function DeleteStudentsById(id: string) {
  return await axios
    .delete(`${apiUrl}/delete-student/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
async function CreateStudent(data: StudentInterface) {
  return await axios
    .post(`${apiUrl}/create-student`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function ListPersonal() {
  return await axios
    .get(`${apiUrl}/list-personal`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function UpdatePersonalById(id: string, data: PersonalInterface) {
  return await axios
    .put(`${apiUrl}/update-personal/${id}`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetPersonalById(id: string) {
  return await axios
    .get(`${apiUrl}/get-personal/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function CreatePersonalDetail(data: PersonalDetailInterface) {
  return await axios
    .post(`${apiUrl}/create-personal-detail`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function ListAddress() {
  return await axios
    .get(`${apiUrl}/list-address`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function ListFamily() {
  return await axios
    .get(`${apiUrl}/list-family`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
async function ListOther() {
  return await axios
    .get(`${apiUrl}/list-other`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
async function GetAddressById(id: string) {
  return await axios
    .get(`${apiUrl}/get-address/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetFamilyById(id: string) {
  return await axios
    .get(`${apiUrl}/get-family/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetOtherById(id: string) {
  return await axios
    .get(`${apiUrl}/get-other/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

//---------------------   Repairing ---------------------------------

async function CreateRepair(data: RepairInterface) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  let res = await fetch(`${apiUrl}/creat-repair`, requestOptions)
    .then((res) => {
      if (res.status == 201) {
        return res.json();
      } else {
        return false;
      }
    });
  return res;
  }

async function GetRepair(id: Number | undefined) {
  const requestOptions = {
    method: "GET"
  };
  let res = await fetch(`${apiUrl}/get-repair/${id}`, requestOptions)
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        return false;
      }
    });
  return res;
}

async function GetListRepairs() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  let res = await fetch(`${apiUrl}/get-list-repair`, requestOptions)
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        return false;
      }
    });
  return res;
}

async function UpdateRepair(data: RepairInterface) {
  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  let res = await fetch(`${apiUrl}/update-repair/:id`, requestOptions)
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        return false;
      }
    });
  return res;
}
//---------------------   DelayedPaymentForm ---------------------------------
async function DelayedPaymentFormUI(data: RepairInterface) {
  return await axios
    .post(`${apiUrl}/create-delayedpaymentform`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
async function GetDelayedPaymentForm(id: string) {
  return await axios
    .get(`${apiUrl}/get-delayedpaymentform/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
async function ListDelayedPaymentForms() {
  return await axios
    .get(`${apiUrl}/list-delayedpaymentform`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
async function UpdateDelayedPaymentForm(id: string, data: RepairInterface) {
  return await axios
    .put(`${apiUrl}/update-delayedpaymentform/${id}`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
async function Adminlist() {
  return await axios
    .get(`${apiUrl}/GetAllAdmins`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
async function CreateAdmin(data: AadminInterface) {
  return await axios
    .post(`${apiUrl}/create-admin`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
async function DeleteAdmin(id: number) {
  try {
    const response = await axios.delete(`${apiUrl}/admin/${id}`, requestOptions);
    return response;
  } catch (error) {
    console.error('Error deleting admin:', error);
    throw error;
  }
} async function ListAnnouncements() {
  return await axios
    .get(`${apiUrl}/list-announcement`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetAnnouncementById(id: string) {
  return await axios
    .get(`${apiUrl}/get-announcement/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function CreateAnnouncement(data: AnnouncementInterface) {
  return await axios
    .post(`${apiUrl}/create-announcement`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function UpdateAnnouncementById(id: string, data: AnnouncementInterface) {
  return await axios
    .put(`${apiUrl}/update-announcement/${id}`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function DeleteAnnouncementById(id: string) {
  return await axios
    .delete(`${apiUrl}/delete-announcement/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
//-------------slip------------------

async function CreateSlip(data: SlipInterface) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  let res = await fetch(`${apiUrl}/repair`, requestOptions)
    .then((res) => {
      if (res.status == 201) {
        return res.json();
      } else {
        return false;
      }
    });
  return res;
  }

async function GetSlip(id: Number | undefined) {
  const requestOptions = {
    method: "GET"
  };
  let res = await fetch(`${apiUrl}/slip/${id}`, requestOptions)
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        return false;
      }
    });
  return res;
}

async function GetListSlips() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  let res = await fetch(`${apiUrl}/slip`, requestOptions)
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        return false;
      }
    });
  return res;
}

async function UpdateSlip(data: SlipInterface) {
  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/slip`, requestOptions)
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        return false;
      }
    });

  return res;
}

//------------Dorm------------//
async function GetDorm(id: number) {
  return await axios
    .get(`${apiUrl}/GetDorm/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
async function ListDorms(data: DormInterface) {
  return await axios
    .post(`${apiUrl}/ListDorms`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
async function UpdateDorm(id: number) {
  return await axios
    .put(`${apiUrl}/UpdateDorm/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

//------------Room------------//
async function GetRoom(id: number) {
  return await axios
    .get(`${apiUrl}/GetRoom/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetRoomsByFloorAndDorm(floorId: number, dormId: number) {
  try {
    const response = await axios.get(`${apiUrl}/rooms/floor/${floorId}/dorm/${dormId}`, requestOptions);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) { 
      return { error: error.response ? error.response.data : "An error occurred" };
    }
    return { error: "An unknown error occurred" }; 
  }
}

async function ListRoom(data: RoomInterface) {
  return await axios
    .post(`${apiUrl}/ListRoom`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
async function DeleteRoom(id: number) {
  return await axios
    .delete(`${apiUrl}/DeleteRoom/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
async function UpdateRoom(id: number) {
  return await axios
    .put(`${apiUrl}/UpdateRoom/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
//------------Reservation------------//
export const CreateReservation = async (data: ReservationInterface) => {
  try {
      const response = await axios.post(`${apiUrl}/CreateReservation`, data);
      return response.data;
  } catch (error) {
      if (axios.isAxiosError(error)) {
          throw new Error(error.response?.data.message || "Error creating reservation");
      }
      throw new Error("Error creating reservation");
  }
};

async function GetReservationsByRoomID(roomID: number) {
  try {
    const response = await axios.get(`${apiUrl}/reservations/room/${roomID}`, requestOptions);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: error.response ? error.response.data : "An error occurred" };
    }
    return { error: "An unknown error occurred" };
  }
}

async function DeleteReservation(id: number) {
  return await axios
    .delete(`${apiUrl}/DeleteReservation/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
async function UpdateReservation(id: number) {
  return await axios
    .put(`${apiUrl}/UpdateReservation/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetStudentsByRoomID(roomID: number) {
  try {
    const response = await axios.get(`${apiUrl}/reservations/${roomID}/students`, requestOptions);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: error.response ? error.response.data : "An error occurred" };
    }
    return { error: "An unknown error occurred" };
  }
}

async function GetUserRoom(userID: number) {
  try {
    const response = await axios.get(`${apiUrl}/check-user-room/${userID}`, requestOptions);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: error.response ? error.response.data : "An error occurred" };
    }
    return { error: "An unknown error occurred" };
  }
}

export {
  SignInStudent,
  SignInAdmin,
  ListStudents,
  GetStudentsById,
  UpdateStudentsById,
  DeleteStudentsById,
  CreateStudent,
  CreatePersonalDetail,
  ListPersonal,
  UpdatePersonalById,
  GetPersonalById,
  ListAddress,
  ListFamily,
  ListOther,
  GetAddressById,
  GetFamilyById,
  GetOtherById,
  GetStudentsByRoomID,
  // ----------------- Repairing --------------
  CreateRepair,
  GetRepair,
  GetListRepairs,
  UpdateRepair,
  // ----------------- DelayedPaymentForm --------------
  DelayedPaymentFormUI,
  GetDelayedPaymentForm,
  ListDelayedPaymentForms,
  UpdateDelayedPaymentForm,
  ListAnnouncements,
  GetAnnouncementById,
  CreateAnnouncement,
  UpdateAnnouncementById,
  DeleteAnnouncementById,
  Adminlist,
  CreateAdmin,
  DeleteAdmin,
  //---------------Slip-------------
  CreateSlip,
  GetSlip,
  GetListSlips,
  UpdateSlip,
  //------------Dorm------------//
  GetDorm,
  ListDorms,
  UpdateDorm,
  //------------Room------------//
  GetRoom,
  ListRoom,
  DeleteRoom,
  UpdateRoom,
  GetRoomsByFloorAndDorm,
  //------------Reservation------------//
  DeleteReservation,
  UpdateReservation,
  GetReservationsByRoomID,
  GetUserRoom
};