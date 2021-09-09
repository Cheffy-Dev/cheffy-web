import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  message,
  Radio,
  Row,
  Select,
  Typography,
} from "antd";
import filesize from "filesize";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { useDispatch } from "react-redux";
import {
  addPlateImages,
  addPlates,
} from "../../../redux/actions/chef/chefAction";
import { foodCategories } from "../../../redux/actions/food";
import FileList from "./FileList";
import UploadFile from "./UploadFile";

const { Title } = Typography;
const { Option } = Select;

const PlateAdd = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [session, loading] = useSession();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [imageState, setImageState] = useState({
    previewVisible: false,
    previewImage: "",
    fileList: [],
  });
  const [categories, setCategories] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    delivery_time: "",
    delivery_time_max: "",
    delivery_type: "",
    categoryId: 0,
  });

  useEffect(() => {
    if (loading === false) {
      if (!session) {
        router.push("/chef/login");
      }
      if (session && session.role !== "chef") {
        router.push("/chef/login");
      }
    } else return;
  }, [session, loading]);

  useEffect(async () => {
    const categories = await dispatch(foodCategories());
    const data = categories.data;
    setCategories(data);
  }, []);

  const handleCancel = () => {
    setImageState({
      ...imageState,
      previewVisible: false,
    });
  };

  const handlePreview = (file) => {
    setImageState({
      ...imageState,
      previewImage: file.thumbUrl,
      previewVisible: true,
    });
  };

  const handleUpload = (files) => {
    if (files.length <= 1) {
      const upload = files.map((file) => ({
        file,
        name: file.name,
        readableSize: filesize(file.size),
        preview: URL.createObjectURL(file),
        progress: 0,
        uploaded: false,
        error: false,
        url: null,
      }));
      setUploadedFiles(upload);
    } else {
      message.error("You can only upload one file");
    }
  };

  const AddPlate = async (url_image) => {
    const {
      name,
      description,
      price,
      delivery_time,
      delivery_time_max,
      delivery_type,
      categoryId,
    } = formData;

    const plateInfo = {
      name,
      description,
      price,
      delivery_time,
      delivery_time_max,
      delivery_type,
      categoryId,
      PlateImages: [
        {
          name,
          url: url_image,
        },
      ],
    };
    console.log(plateInfo);
    const res = await dispatch(addPlates(plateInfo));
    if (res.status == 201) {
      router.push("/chef/plates");
      message.success("Plate Successfully Added");
    } else {
      message.error("Failed to Add Plate");
    }
  };

  const handleSubmit = async (values) => {
    const {
      name,
      description,
      price,
      delivery_time,
      delivery_time_max,
      delivery_type,
      categoryId,
    } = values;

    setFormData({
      ...formData,
      name,
      description,
      price,
      delivery_time,
      delivery_time_max,
      delivery_type,
      categoryId,
    });

    if (uploadedFiles[0]) {
      const body = new FormData();
      body.append("file", uploadedFiles[0].file);
      const res = await dispatch(addPlateImages(body));
      const imageUrl = res.data.url;
      AddPlate(imageUrl);
    } else {
      AddPlate(null);
    }
  };

  return !loading ? (
    <div className="px-32 py-6 shadow-lg rounded-sm bg-white">
      <div className="flex flex-col justify-center items-center">
        <Divider>
          <Title level={5}>Fill the Form</Title>
        </Divider>
        <div className="lg:w-6/12 w-8/12">
          <Form
            initialValues={{ ["categoryId"]: "Choose Category" }}
            layout="vertical"
            name="add-plate"
            onFinish={handleSubmit}
            scrollToFirstError={true}
          >
            <Form.Item
              label="Name of your food"
              className="font-semibold"
              name="name"
              rules={[{ required: true, message: "Fill this field" }]}
              hasFeedback
            >
              <Input size="large" className="w-full" />
            </Form.Item>
            <Form.Item
              label="Food description"
              className="font-semibold"
              name="description"
              rules={[{ required: true, message: "Fill this field" }]}
              tooltip={{
                title:
                  "If your description contains YouTube links, the videos will be shown below the description.",
                icon: <BiInfoCircle />,
              }}
            >
              <Input.TextArea size="large" className="w-full" />
            </Form.Item>
            <Form.Item
              label="Price"
              className="font-semibold"
              name="price"
              rules={[{ required: true, message: "Fill this field" }]}
            >
              <Input
                type="number"
                size="large"
                placeholder="$"
                className="w-3/12"
              />
            </Form.Item>
            <Form.Item
              label="Time"
              className="font-semibold"
              tooltip={{
                title: "(required) time taken to complete food.",
                icon: <BiInfoCircle />,
              }}
            >
              <Row
                gutter={[8, 8]}
                align=""
                justify={"start"}
                wrap={false}
                className="-bottom-px"
              >
                <Col className="w-3/12" span={6}>
                  <Form.Item name="delivery_time">
                    <Input placeholder="20min" type="number" size="large" />
                  </Form.Item>
                </Col>
                <Col className="mt-2">to</Col>
                <Col className="w-3/12">
                  <Form.Item name="delivery_time_max">
                    <Input placeholder="30min" type="number" size="large" />
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item
              label="Food category"
              className="font-semibold -mt-6"
              name="categoryId"
              rules={[{ required: true, message: "Fill this field" }]}
            >
              <Select className="w-full" size="large">
                {categories &&
                  categories.map((category) => (
                    <Option key={category.id} value={category.id}>
                      {category.name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Delivery type"
              className="font-semibold"
              name="delivery_type"
              rules={[{ required: true, message: "Fill this field" }]}
            >
              <Radio.Group buttonStyle="solid" size="large" className="w-full">
                <Radio.Button value="free" className="w-3/6">
                  Free Delivery
                </Radio.Button>
                <Radio.Button value="paid" className="w-3/6">
                  Paid Delivery
                </Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name="picture"
              label="Upload Your Food Image"
              className="-mt-8 font-semibold"
              tooltip={{
                title: "For best results, use JPG, GIF or PNG images",
                icon: <BiInfoCircle />,
              }}
            >
              <UploadFile onUpload={handleUpload} />
              {!!uploadedFiles.length && <FileList file={uploadedFiles[0]} />}
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                size="large"
                className="font-semibold w-4/12"
                htmlType="submit"
              >
                Add Plate
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default PlateAdd;
