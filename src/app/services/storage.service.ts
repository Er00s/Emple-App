import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { environment } from 'src/environments/environment';
import { Employee } from '../interfaces/employee';
import { initializeApp } from 'firebase/app';
import {getFirestore,collection,getDocs,addDoc,updateDoc,doc,deleteDoc,} from 'firebase/firestore/lite';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  
  public storageRef = initializeApp(environment.firebaseConfig);
  public db = getFirestore(this.storageRef);
  public employeesColection!: Employee[];

  constructor() {}

  async onDeleteEmployee(id: string) {
    await deleteDoc(doc(this.db, 'employees', id));
  }

  async onEditEmployee(employee: Employee) {
    const employeeRef = doc(this.db, 'employees', employee.id);
    await updateDoc(employeeRef, {
      name: employee.name,
      lastname: employee.lastname,
      job: employee.job,
      birth: employee.birth,
    });
  }

  onSaveEmployee(newEmployee: Employee) {
    return new Promise(async (resolve, reject) => {
      try {
        const docRef = await addDoc(
          collection(this.db, 'employees'),
          newEmployee
        );
        resolve(() => {
          docRef.id;
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  async getEmployees(): Promise<Employee[]> {
    const employees = collection(this.db, 'employees');
    const employeesSnapshot = await getDocs(employees);
    const employeesList = employeesSnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    this.employeesColection = <Employee[]>employeesList;
    return this.employeesColection;
  }

  async getHelpless(): Promise<Employee[]> {
    const employees = collection(this.db, 'helpless');
    const employeesSnapshot = await getDocs(employees);
    const employeesList = employeesSnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    this.employeesColection = <Employee[]>employeesList;

    return <Employee[]>employeesList;
  }

  onSaveHelpless(newHelpless: Employee) {
    return new Promise(async (resolve, reject) => {
      try {
        const docRef = await addDoc(
          collection(this.db, 'helpless'),
          newHelpless
        );
        resolve(() => {
          docRef.id;
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  async onDeleteHelpless(id: string) {
    await deleteDoc(doc(this.db, 'helpless', id));
  }
}
