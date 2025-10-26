import { Header } from "../components/Header";
import { IoStatsChart } from "react-icons/io5";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { use, useEffect, useState } from "react";
import { CircularProgress, Button } from "@mui/material";
import {
  getBarChartStats,
  getCircularChartStats,
  getCrossFilterStats,
} from "../services/api.services";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { FaPeopleRoof } from "react-icons/fa6";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import CrossFilterModal from "../components/Stats/CrossFilterModal";
import { pivotCrossStats } from "../tools/tools";
import Modal from "@mui/material/Modal";
import DynamicBarChart from "../components/Stats/DynamicBarChart";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 1000,
  bgcolor: "background.paper",
  borderRadius: "16px",
  boxShadow: 24,
  p: 4,
  outline: "none",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 3,
};

const StatsPage = () => {
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  //Grafico de Barras
  const [bloodType, setBloodType] = useState({});
  const [houseCondition, setHouseCondition] = useState({});
  const [muni, setMuni] = useState({});
  const [educationLevel, setEducationLevel] = useState({});
  const [incomeType, setIncomeType] = useState({});
  const [phoneCompany, setPhoneCompany] = useState({});
  const [shirtSize, setShirtSize] = useState({});
  const [shoeSize, setShoeSize] = useState({});

  //Grafico Circular
  const [phone, setPhone] = useState([]);
  const [writeRead, setWriteRead] = useState([]);
  const [whatsapp, setWhatsapp] = useState([]);
  const [personCharge, setPersonCharge] = useState([]);
  const [dependents, setDependents] = useState([]);
  const [health, setHealth] = useState([]);
  const [gender, setGender] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [zone, setZone] = useState([]);
  const [transport, setTransport] = useState([]);

  const [barCharts, setBarCharts] = useState(true);
  const [openCrossModal, setOpenCrossModal] = useState(false);
  const [crossStats, setCrossStats] = useState([]);
  const [selectedFields, setSelectedFields] = useState({
    field1: "",
    field2: "",
  });
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    console.log(crossStats);
  }, [crossStats]);

  const handleChange = (event, value) => {
    setBarCharts(value);
  };

  const getStats = async () => {
    try {
      const response = await getBarChartStats();
      const _response = await getCircularChartStats();
      if (response.status === 200) {
        setTotal(response.data.stats.total);
        setBloodType(response.data.stats.blood_type);
        setHouseCondition(response.data.stats.house_condition);
        setMuni(response.data.stats.municipality);
        setEducationLevel(response.data.stats.education_level);
        setIncomeType(response.data.stats.income_type);
        setPhoneCompany(response.data.stats.phone_company);
        setShirtSize(response.data.stats.shirt_size);
        setShoeSize(response.data.stats.shoe_size);
      }
      if (_response.status === 200) {
        setPhone([
          { name: "Con teléfono", value: _response.data.stats.phone.with },
          { name: "Sin teléfono", value: _response.data.stats.phone.without },
        ]);
        setWriteRead([
          {
            name: "Saben leer y escribir",
            value: _response.data.stats.write_and_read.yes,
          },
          {
            name: "No saben leer ni escribir",
            value: _response.data.stats.write_and_read.no,
          },
        ]);
        const ws = _response.data.stats.whatsapp;
        setWhatsapp([
          { name: "Con WhatsApp", value: ws.yes },
          { name: "Sin WhatsApp", value: ws.no },
        ]);
        const pic = _response.data.stats.person_in_charge;
        setPersonCharge([
          { name: "Con responsable", value: pic.with },
          { name: "Sin responsable", value: pic.without },
        ]);
        const dep = _response.data.stats.dependents;
        setDependents([
          { name: "Con dependientes", value: dep.with },
          { name: "Sin dependientes", value: dep.without },
        ]);
        const hl = _response.data.stats.health;
        setHealth([
          { name: "Con condición de salud/discapacidad", value: hl.with },
          { name: "Sin condición", value: hl.without },
        ]);
        const g = _response.data.stats.gender;
        setGender(
          g.map((item) => ({
            name: item._id === "M" ? "Hombres" : "Mujeres",
            value: item.count,
          }))
        );
        const dept = _response.data.stats.department;
        setDepartments(
          dept.map((item) => ({
            name: item._id,
            value: item.count,
          }))
        );
        const zn = _response.data.stats.zone;
        setZone(
          zn.map((item) => ({
            name: item._id,
            value: item.count,
          }))
        );
        const tr = _response.data.stats.transportation || {
          difficulty: 0,
          available: 0,
        };

        const totalBeneficiarios = response.data.stats.total || 0;
        const sinDificultad = Math.max(totalBeneficiarios - tr.difficulty, 0);
        const conApoyo = Math.min(tr.available, tr.difficulty);
        const sinApoyo = Math.max(tr.difficulty - tr.available, 0);
        console.log("Transporte calculado:", {
          total: totalBeneficiarios,
          dificultad: tr.difficulty,
          apoyo: tr.available,
          sinDificultad,
          conApoyo,
          sinApoyo,
        });

        setTransport([
          { name: "Sin dificultad de transporte", value: sinDificultad },
          { name: "Con dificultad y apoyo", value: conApoyo },
          { name: "Con dificultad sin apoyo", value: sinApoyo },
        ]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const BarSection = () => {
    return (
      <>
        <article className="flex justify-center flex-wrap gap-8">
          <Box bgcolor={"white"}>
            <h3 style={{ textAlign: "center" }}>
              Distribución de Tipos de Sangre
            </h3>
            <BarChart width={600} height={400} data={bloodType}>
              <XAxis dataKey="_id" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="count"
                fill="#8884d8"
                name="Número de beneficiarios"
              />
            </BarChart>
          </Box>
          <Box bgcolor={"white"}>
            <h3 style={{ textAlign: "center" }}>
              Distribución de Tipo de Vivienda
            </h3>
            <BarChart width={600} height={400} data={houseCondition}>
              <XAxis dataKey="_id" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="count"
                fill="#D8CB01"
                name="Número de beneficiarios"
              />
            </BarChart>
          </Box>
          <Box bgcolor={"white"}>
            <h3 style={{ textAlign: "center" }}>Distribución de Municipios</h3>
            <BarChart width={600} height={400} data={muni}>
              <XAxis dataKey="_id" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="count"
                fill="#02A9DC"
                name="Número de beneficiarios"
              />
            </BarChart>
          </Box>
          <Box bgcolor={"white"}>
            <h3 style={{ textAlign: "center" }}>
              Distribución de Niveles de Educacion
            </h3>
            <BarChart width={600} height={400} data={educationLevel}>
              <XAxis dataKey="_id" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="count"
                fill="#02DC59"
                name="Número de beneficiarios"
              />
            </BarChart>
          </Box>
          <Box bgcolor={"white"}>
            <h3 style={{ textAlign: "center" }}>
              Distribución de Tipo de Ingresos
            </h3>
            <BarChart width={600} height={400} data={incomeType}>
              <XAxis dataKey="_id" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="count"
                fill="#EFC3CA"
                name="Número de beneficiarios"
              />
            </BarChart>
          </Box>
          <Box bgcolor={"white"}>
            <h3 style={{ textAlign: "center" }}>
              Distribución de Compañía Telefónica
            </h3>
            <BarChart width={600} height={400} data={phoneCompany}>
              <XAxis dataKey="_id" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="count"
                fill="#DFC57B"
                name="Número de beneficiarios"
              />
            </BarChart>
          </Box>
          <Box bgcolor={"white"}>
            <h3 style={{ textAlign: "center" }}>
              Distribución de Talla de Camisa
            </h3>
            <BarChart width={600} height={400} data={shirtSize}>
              <XAxis dataKey="_id" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="count"
                fill="#8D6F64"
                name="Número de beneficiarios"
              />
            </BarChart>
          </Box>
          <Box bgcolor={"white"}>
            <h3 style={{ textAlign: "center" }}>
              Distribución de Talla de Zapatos
            </h3>
            <BarChart width={600} height={400} data={shoeSize}>
              <XAxis dataKey="_id" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="count"
                fill="#71C0F5"
                name="Número de beneficiarios"
              />
            </BarChart>
          </Box>
        </article>
      </>
    );
  };

  const PieSection = () => {
    return (
      <>
        <article className="flex justify-center flex-wrap gap-8 pb-12">
          <Box bgcolor={"white"}>
            <h3 style={{ textAlign: "center" }}>Poseen Telefono</h3>
            <PieChart width={400} height={400}>
              <Pie
                data={phone}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label
              >
                {phone.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={["#0088FE", "#FF8042"][index]} // colores distintos
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Box>
          <Box bgcolor={"white"}>
            <h3 style={{ textAlign: "center" }}>Pueden Leer y Escribir</h3>
            <PieChart width={400} height={400}>
              <Pie
                data={writeRead}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label
              >
                {writeRead.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={["#00C49F", "#FF6B6B"][index]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Box>
          <Box bgcolor={"white"}>
            <h3 style={{ textAlign: "center" }}>Poseen Whatsapp</h3>
            <PieChart width={400} height={400}>
              <Pie
                data={whatsapp}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label
              >
                {whatsapp.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={["#25D366", "#AAAAAA"][index]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Box>
          <Box bgcolor={"white"}>
            <h3 style={{ textAlign: "center" }}>Poseen Persona a Cargo</h3>
            <PieChart width={400} height={400}>
              <Pie
                data={personCharge}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label
              >
                {personCharge.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={["#7E57C2", "#FFD54F"][index]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Box>
          <Box bgcolor={"white"}>
            <h3 style={{ textAlign: "center" }}>
              Poseen Personas a su Cuidado
            </h3>
            <PieChart width={400} height={400}>
              <Pie
                data={dependents}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label
              >
                {dependents.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={["#E91E63", "#4DD0E1"][index]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Box>
          <Box bgcolor={"white"}>
            <h3 style={{ textAlign: "center" }}>
              Beneficiarios con Condiciones de Salud o Discapacidad
            </h3>
            <PieChart width={400} height={400}>
              <Pie
                data={health}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label
              >
                {health.map((entry, index) => (
                  <Cell
                    key={`cell-health-${index}`}
                    fill={["#FF9800", "#4CAF50"][index]} // Naranja y Verde
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Box>
          <Box bgcolor={"white"}>
            <h3 style={{ textAlign: "center" }}>Distribución por Género</h3>
            <PieChart width={400} height={400}>
              <Pie
                data={gender}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label
              >
                {gender.map((entry, index) => (
                  <Cell
                    key={`cell-gender-${index}`}
                    fill={["#42A5F5", "#EC407A"][index]} // Azul para Hombres, Rosa para Mujeres
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Box>
          <Box bgcolor={"white"}>
            <h3 style={{ textAlign: "center" }}>
              Distribución por Departamento
            </h3>
            <PieChart width={500} height={400}>
              <Pie
                data={departments}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={150}
                label
              >
                {departments.map((entry, index) => (
                  <Cell
                    key={`cell-department-${index}`}
                    fill={
                      [
                        "#1E88E5",
                        "#43A047",
                        "#FB8C00",
                        "#8E24AA",
                        "#E53935",
                        "#3949AB",
                        "#00ACC1",
                        "#FDD835",
                        "#6D4C41",
                      ][index % 9]
                    } // paleta variada
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend layout="vertical" align="right" verticalAlign="middle" />
            </PieChart>
          </Box>
          <Box bgcolor={"white"}>
            <h3 style={{ textAlign: "center" }}>Distribución por Zona</h3>
            <PieChart width={400} height={400}>
              <Pie
                data={zone}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label
              >
                {zone.map((entry, index) => (
                  <Cell
                    key={`cell-zone-${index}`}
                    fill={["#66BB6A", "#29B6F6"][index]} // Verde para Rural, Celeste para Urbana
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Box>
          <Box bgcolor={"white"}>
            <h3 style={{ textAlign: "center" }}>Dificultades de Transporte</h3>
            {transport && transport.length > 0 ? (
              <PieChart width={450} height={400}>
                <Pie
                  data={transport}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  label
                >
                  {transport.map((entry, index) => (
                    <Cell
                      key={`cell-transportation-${index}`}
                      fill={["#4CAF50", "#FF9800", "#F44336"][index]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            ) : (
              <p
                style={{ textAlign: "center", padding: "20px", color: "gray" }}
              >
                No hay datos disponibles
              </p>
            )}
          </Box>
        </article>
      </>
    );
  };

  const ResultModal = () => {
    return (
      <>
        <Modal
          open={showResult}
          onClose={() => {
            setShowResult(false);
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {crossStats.length > 0 && (
              <Box sx={{ p: 2 }} width={"100%"}>
                <h3 style={{ textAlign: "center" }}>
                  Distribución de {selectedFields.field1} por{" "}
                  {selectedFields.field2}
                </h3>
                <DynamicBarChart
                  data={crossStats}
                  field1={selectedFields.field1}
                  field2={selectedFields.field2}
                />
              </Box>
            )}
            <Button
              onClick={() => {
                setShowResult(false);
              }}
              variant="contained"
            >
              Cerrar
            </Button>
          </Box>
        </Modal>
      </>
    );
  };

  const card = (
    <CardContent>
      <Typography
        gutterBottom
        sx={{
          color: "text.secondary",
          fontSize: 28,
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          gap: 4,
          justifyContent: "center",
        }}
      >
        Total de Beneficiarios <FaPeopleRoof size={30} />
      </Typography>
      <Typography
        sx={{
          display: "flex",
          justifyContent: "center",
          fontSize: 40,
          gap: 4,
          alignItems: "center",
        }}
        variant="h5"
        component="div"
      >
        {total}
      </Typography>
    </CardContent>
  );

  useEffect(() => {
    getStats();
  }, []);

  return (
    <>
      <Header />
      <section className="flex flex-col items-center">
        <article className=" w-1/2  font-bold text-3xl p-10 flex justify-center items-center gap-5">
          <IoStatsChart size={50} color="#4B5563" />
          <h2 className=" text-5xl text-gray-500  ">
            {" "}
            Estadísticas de Beneficiarios
          </h2>
        </article>
        {loading ? (
          <CircularProgress />
        ) : (
          <Box
            display={"flex"}
            gap={4}
            flexDirection={"column"}
            alignItems={"center"}
          >
            <Box sx={{ width: "50%" }}>
              <Card variant="outlined">{card}</Card>
            </Box>
            <ToggleButtonGroup
              color="primary"
              value={barCharts}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
            >
              <ToggleButton value={true}>Barras</ToggleButton>
              <ToggleButton value={false}>Circulares</ToggleButton>
            </ToggleButtonGroup>
            <Button variant="outlined" onClick={() => setOpenCrossModal(true)}>
              Análisis Cruzado
            </Button>
            {barCharts ? <BarSection /> : <PieSection />}
          </Box>
        )}
        <CrossFilterModal
          open={openCrossModal}
          onClose={() => setOpenCrossModal(false)}
          onConfirm={async (field1, field2) => {
            setSelectedFields({ field1, field2 });

            try {
              const res = await getCrossFilterStats(field1, field2); // tu service que llama a /cross-stats
              if (res.status === 200) {
                const pivoted = pivotCrossStats(res.data.stats, field1, field2);
                setCrossStats(pivoted);
              }
            } catch (err) {
              console.error(err);
            } finally {
              setOpenCrossModal(false);
              setShowResult(true);
            }
          }}
        />
        <ResultModal />
      </section>
    </>
  );
};

export default StatsPage;
