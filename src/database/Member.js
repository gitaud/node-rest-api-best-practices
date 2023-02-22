const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

const getAllMembers = (filterParams) => {
  try {
    let members = DB.members;

    if (filterParams.gender) {
      members = members.filter(member => 
        member.gender == gender  
      )
    }

    if (filterParams.dob) {
      members = members.sort((a, b) =>
        new Date(b.dateOfBirth) - new Date(a.dateOfBirth)
      )
    }

    if (filterParams.page) {
      let indx = Number(filterParams.page);
      if (indx < members.length && (indx + 10) < members.length) {
        members = members.slice(indx, indx + 10);
      } else if (indx < members.length) {
        members = members.slice(indx, members.length - 1);
      } else {
        members = members.slice(members.length - 11, members.length - 1)
      }
    }

    if (filterParams.length) {
      members = members.slice(0, Number(filterParams.length));
    }
    return members;
  } catch(error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
}

const getOneMember = (memberId) => {
  try {
    const member = DB.members.find(member => member.id === memberId);
    if (!member) {
      throw {
        status: 400,
        message: `Can't find member with the id '${memberId}'`
      };
    }
    return member;
  } catch(error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
}

const createNewMember = (newMember) => {
  try {
    const memberFound = DB.members.findIndex(member => 
      member.email === newMember.email  
    )
    if (memberFound !== -1) {
      throw {
        status: 400,
        message: `Existing member with the email ${newMember.email} found`
      };
    }
    
    DB.members.push(data);
    saveToDatabase(DB);
    
    return newMember;
  
  } catch(error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
}

const updateOneMember = (memberId, changes) => {
  try {
    const memberIndex = DB.members.findIndex(member => 
      member.id === memberId
    );
    if (memberIndex === -1) {
      throw {
        status: 400,
        message: `Member with the id ${memberId} not found`
      };
    };
    const updatedMember = { 
      ...DB.members[memberIndex], 
      ...changes,
      updatedAt: new Date().toLocaleDateString("en-us", { timezone: "UTC"})
    };

    DB.members[memberIndex] = updatedMember;
    saveToDatabase(DB);
    return updatedMember;

  } catch(error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const deleteOneMember = (memberId) => {
  try {
    let deleteIndex = DB.members.findIndex(member => 
      member.id === memberId
    );
    if (deleteIndex === -1) {
      throw {
        status: 400,
        message: `Can't find member with the id ${memberId}`
      };
    }
    DB.members.splice(deleteIndex, 1);
    saveToDatabase(DB);
  } catch(error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
  
}

module.exports = { getAllMembers, getOneMember, createNewMember, updateOneMember, deleteOneMember }