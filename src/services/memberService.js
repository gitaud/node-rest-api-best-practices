const { v4: uuid } = require('uuid');
const Member = require("../database/Member");

const getAllMembers = (filterParams) => {
  try {
    const allMembers = Member.getAllMembers(filterParams);
    return allMembers;
  } catch(error) {
    throw error;
  }
}

const getOneMember = (memberId) => {
  try {
    const member = Member.getOneMember(memberId);
    return member;
  } catch(error) {
    throw error;
  }
}

const createNewMember = (member) => {
  const newMember = {
    id: uuid(),
    ...member,
    createdAt: new Date().toLocaleDateString("en-us", { timezone: "UTC"}),
    updatedAt: new Date().toLocaleTimeString("en-us", { timezone: "UTC"}),
  };
  try {
    const member = Member.createNewMember(newMember);
    return member;
  } catch(error) {
    throw error;
  }
}

const updateOneMember = (memberId, changes) => {
  try {
    const updatedMember = Member.updateOneMember(memberId, changes);
    return updatedMember;
  } catch(error) {
    throw error;
  }
}

const deleteOneMember = (memberId) => {
  try {
    Member.deleteOneMember(memberId);
  } catch(error) {
    throw error;
  }
}

module.exports = {
  getAllMembers,
  getOneMember,
  createNewMember,
  updateOneMember,
  deleteOneMember
};