const crypto = require("node-crypto");
const dotenv = require("dotenv");
const memberService = require("../services/memberService");

dotenv.config();

const getAllMembers = (req, res) => {
  const { dob, gender, page, length } = req.query;
  try {
    const allMembers = memberService.getAllMembers({dob, gender, page, length});
    return res
    .status(200)
    .send({
      status: "OK",
      data: allMembers
    });
  } catch(error) {
    return res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error }});
  }
};

const getOneMember = (req, res) => {
  const {
    param: {
      memberId
    }
  } = req;
  if (!memberId) {
    return res
      .status(400)
      .send({
        status: "FAILED",
        data: { error: "Parameter '/:memberId' cannot be empty "}
      });
  }
  try {
    const updatedMember = memberService.getOneMember(memberId);
    return res.send({
      status: "OK",
      data: updatedMember
    });
  } catch(error) {
    return res
      .status(error?.status || 500)
      .send({
        status: "FAILED", 
        data: { error: error?.message || error }
      });
  }
}

const createNewMember = (req, res) => {
  const { body } = req;
  if (
    !body.name ||
    !body.dateOfBirth ||
    !body.gender ||
    !body.email ||
    !body.password
  ) {
    return res
      .status(400)
      .send({
        status: "FAILED",
        data: {
          error: "One of the following is missing in the request body: 'name', 'date of birth', 'gender', 'email', 'password'"
        }
      }
    );
    }

  const memberToCreate = {
    name: body.name,
    dateOfBirth: body.dateOfBirth,
    gender: body.dateOfBirth,
    email: body.email,
    password: crypto.createHmac("sha256", process.env.SECRET)
      .update(body.password)
      .digest("hex")
  };
  try {
    const newMember = memberService.createNewMember(memberToCreate);
    return res.status(201).send({ status: "OK", data: newMember }); 
  } catch(error) {
    res
      .status(error?.status || 500)
      .send({
        status: "FAILED",
        data: { error: error?.message || error}
      });
  }
}

const updateOneMember = (req, res) => {
  const { 
    body, 
    param: {
      memberId
    } 
  } = req;

  try {
    const updatedMember = memberService.updateOneMember(memberId, body);
    return res.status(200).send({ status: "OK", data: updatedMember });
  } catch(error) {
    return res
      .status(error?.status || 500)
      .send({
        status: "FAILED",
        data: { error: error?.message || error }
      }
    );
  }
}

const deleteOneMember = (req, res) => {
  const {
    param: {
      memberId
    }
  } = req;
  if (!memberId) {
    return res
      .status(400)
      .send({
        status: 'FAILED',
        data: { error: "Parameter '/:memberId' cannot be empty" }
      });
  }

  try {
    memberService.deleteOneMember(memberId);
    return res.status(204).send({status: "OK"});
  } catch(error) {
    return res
      .status(error?.status || 500)
      .send({
        status: "FAILED",
        data: { error: error?.message || error }
      }
    );
  }
}

module.exports = { 
  getAllMembers, 
  getOneMember, 
  createNewMember, 
  updateOneMember, 
  deleteOneMember 
};