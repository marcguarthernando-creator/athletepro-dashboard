-- Full Supabase Migration Script
-- Generated automatically

-- 1. Create Medical Profiles Table
CREATE TABLE IF NOT EXISTS medical_profiles (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  player_id text REFERENCES players(id) ON DELETE CASCADE,
  biometrics jsonb DEFAULT '{}',
  anthropometry jsonb DEFAULT '{}',
  rom jsonb DEFAULT '{}',
  evaluation jsonb DEFAULT '{}',
  physical_tests jsonb DEFAULT '{}',
  general_info jsonb DEFAULT '{}',
  extra_data jsonb DEFAULT '{}',
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(player_id)
);

ALTER TABLE medical_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public all access on medical_profiles" ON medical_profiles FOR ALL USING (true);


-- 2. Create Injuries Table
CREATE TABLE IF NOT EXISTS injuries (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  player_id text REFERENCES players(id) ON DELETE CASCADE,
  date date NOT NULL,
  type text,
  diagnosis text,
  status text CHECK (status IN ('Activa', 'Recuperada')),
  severity text,
  treatment text,
  estimated_return text,
  is_private boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

ALTER TABLE injuries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public all access on injuries" ON injuries FOR ALL USING (true);


-- 3. Seed Medical Profiles

INSERT INTO medical_profiles (player_id, biometrics, anthropometry, rom, evaluation, physical_tests, general_info, extra_data)
VALUES (
  '1',
  '{"weight":"96.7","height":"191.1","age":27,"wingspan":"197.2"}'::jsonb,
  '{"fat":"13.1","muscle":"45.9","bone":"11.2","residual":"29.8","somatotype":{"endo":"2.4","meso":"4.3","ecto":"2.4"}}'::jsonb,
  '{"lower":{"Tobillo Flexión Dorsal":{"l":"42°","r":"44°","history":[{"date":"OCT 2025","val":"40° | 41°"}]},"Cadera Flexión":{"l":"115°","r":"112°","history":[{"date":"OCT 2025","val":"110° | 108°"}]},"Knee Extension":{"l":"0°","r":"0°","history":[{"date":"OCT 2025","val":"0° | -2°"}]}},"upper":{"Hombro Flexión":{"l":"175°","r":"178°","history":[{"date":"JUN 2025","val":"170° | 172°"}]},"Hombro Rot. Interna":{"l":"65°","r":"62°","history":[{"date":"JUN 2025","val":"60° | 58°"}]}}}'::jsonb,
  '{"UPPER BODY":{"score":"8.5","desc":"Sin asimetrías detectadas. Excelente estabilidad.","history":[{"date":"OCT 2025","val":"8.2"}]},"SPINAL COLUMN":{"score":"7.8","desc":"Control motor adecuado en movimientos dinámicos.","history":[{"date":"OCT 2025","val":"7.5"}]},"LOWER BODY":{"score":"9.0","desc":"Potencia explosiva en rango óptimo.","history":[{"date":"OCT 2025","val":"8.5"}]},"ABS / CORE":{"score":"8.0","desc":"Estabilidad central sólida en anti-rotación.","history":[{"date":"OCT 2025","val":"7.8"}]}}'::jsonb,
  '{"jump":{"history":[{"date":"15 DIC","value":"42"},{"date":"01 DIC","value":"40"},{"date":"15 NOV","value":"43"},{"date":"01 NOV","value":"41"}],"comments":"Mejora constante en la potencia reactiva."},"hopTest":{"history":[{"date":"15 DIC","lVal":"185","rVal":"182","asymmetry":"1.6%"},{"date":"01 DIC","lVal":"180","rVal":"178","asymmetry":"1.1%"}],"comments":"Asimetría dentro de los rangos de normalidad (<5%)."},"strengthPeaks":{"history":[{"date":"15 DIC","isometric":"450","eccentric":"510"},{"date":"01 DIC","isometric":"435","eccentric":"495"}],"comments":"Pico de fuerza isométrica en niveles óptimos."},"custom":[{"name":"Grip Strength","value":"65","unit":"kg","date":"15 DIC"}]}'::jsonb,
  '{"medication":["Aspirina 100mg","Vitamina D3"],"supplementation":["Proteína Whey","Creatina"],"allergies":["Ninguna conocida"],"previousInjuries":["Esguince leve (2022)"],"familyHistory":["Ninguno relevante"],"personalHistory":["Operado de apéndice"]}'::jsonb,
  '{"extra":{"aiReports":[{"title":"Análisis de Recuperación Semanal","date":"15 Dic 2025","type":"Weekly"},{"title":"Predicción de Riesgo de Lesión","date":"01 Dic 2025","type":"Risk"}],"questionnaires":[{"date":"20 DIC 2025","name":"Well-being (WBQ)","score":"85/100","status":"Completo"},{"date":"19 DIC 2025","name":"Well-being (WBQ)","score":"82/100","status":"Completo"},{"date":"18 DIC 2025","name":"Well-being (WBQ)","score":"88/100","status":"Completo"}]},"extraTests":{"selected":["ECOGRAFÍA","RESONANCIA MAGNÉTICA (RMN)"],"comment":"Resultados pendientes de revisión por el especialista. El jugador presenta molestias leves en la zona."}}'::jsonb
) ON CONFLICT (player_id) DO NOTHING;

INSERT INTO injuries (player_id, date, type, diagnosis, status, severity, treatment, is_private)
VALUES ('1', '2025-02-15', 'Esguince Tobillo', 'Esguince Tobillo', 'Recuperada', 'medium', 'Rehabilitación estándar', false);

INSERT INTO injuries (player_id, date, type, diagnosis, status, severity, treatment, is_private)
VALUES ('1', '2025-01-15', 'Esguince Tobillo', 'Esguince Tobillo', 'Recuperada', 'medium', 'Rehabilitación estándar', false);

INSERT INTO injuries (player_id, date, type, diagnosis, status, severity, treatment, is_private)
VALUES ('1', '2025-03-15', 'Esguince Tobillo', 'Esguince Tobillo', 'Recuperada', 'medium', 'Rehabilitación estándar', true);

INSERT INTO medical_profiles (player_id, biometrics, anthropometry, rom, evaluation, physical_tests, general_info, extra_data)
VALUES (
  '2',
  '{"weight":"96.3","height":"185.3","age":29,"wingspan":"190.4"}'::jsonb,
  '{"fat":"13.8","muscle":"50.0","bone":"10.4","residual":"25.8","somatotype":{"endo":"2.3","meso":"5.8","ecto":"1.6"}}'::jsonb,
  '{"lower":{"Tobillo Flexión Dorsal":{"l":"42°","r":"44°","history":[{"date":"OCT 2025","val":"40° | 41°"}]},"Cadera Flexión":{"l":"115°","r":"112°","history":[{"date":"OCT 2025","val":"110° | 108°"}]},"Knee Extension":{"l":"0°","r":"0°","history":[{"date":"OCT 2025","val":"0° | -2°"}]}},"upper":{"Hombro Flexión":{"l":"175°","r":"178°","history":[{"date":"JUN 2025","val":"170° | 172°"}]},"Hombro Rot. Interna":{"l":"65°","r":"62°","history":[{"date":"JUN 2025","val":"60° | 58°"}]}}}'::jsonb,
  '{"UPPER BODY":{"score":"8.5","desc":"Sin asimetrías detectadas. Excelente estabilidad.","history":[{"date":"OCT 2025","val":"8.2"}]},"SPINAL COLUMN":{"score":"7.8","desc":"Control motor adecuado en movimientos dinámicos.","history":[{"date":"OCT 2025","val":"7.5"}]},"LOWER BODY":{"score":"9.0","desc":"Potencia explosiva en rango óptimo.","history":[{"date":"OCT 2025","val":"8.5"}]},"ABS / CORE":{"score":"8.0","desc":"Estabilidad central sólida en anti-rotación.","history":[{"date":"OCT 2025","val":"7.8"}]}}'::jsonb,
  '{"jump":{"history":[{"date":"15 DIC","value":"42"},{"date":"01 DIC","value":"40"},{"date":"15 NOV","value":"43"},{"date":"01 NOV","value":"41"}],"comments":"Mejora constante en la potencia reactiva."},"hopTest":{"history":[{"date":"15 DIC","lVal":"185","rVal":"182","asymmetry":"1.6%"},{"date":"01 DIC","lVal":"180","rVal":"178","asymmetry":"1.1%"}],"comments":"Asimetría dentro de los rangos de normalidad (<5%)."},"strengthPeaks":{"history":[{"date":"15 DIC","isometric":"450","eccentric":"510"},{"date":"01 DIC","isometric":"435","eccentric":"495"}],"comments":"Pico de fuerza isométrica en niveles óptimos."},"custom":[{"name":"Grip Strength","value":"65","unit":"kg","date":"15 DIC"}]}'::jsonb,
  '{"medication":["Aspirina 100mg","Vitamina D3"],"supplementation":["Proteína Whey","Creatina"],"allergies":["Ninguna conocida"],"previousInjuries":["Esguince leve (2022)"],"familyHistory":["Ninguno relevante"],"personalHistory":["Operado de apéndice"]}'::jsonb,
  '{"extra":{"aiReports":[{"title":"Análisis de Recuperación Semanal","date":"15 Dic 2025","type":"Weekly"},{"title":"Predicción de Riesgo de Lesión","date":"01 Dic 2025","type":"Risk"}],"questionnaires":[{"date":"20 DIC 2025","name":"Well-being (WBQ)","score":"85/100","status":"Completo"},{"date":"19 DIC 2025","name":"Well-being (WBQ)","score":"82/100","status":"Completo"},{"date":"18 DIC 2025","name":"Well-being (WBQ)","score":"88/100","status":"Completo"}]},"extraTests":{"selected":["ECOGRAFÍA","RESONANCIA MAGNÉTICA (RMN)"],"comment":"Resultados pendientes de revisión por el especialista. El jugador presenta molestias leves en la zona."}}'::jsonb
) ON CONFLICT (player_id) DO NOTHING;

INSERT INTO injuries (player_id, date, type, diagnosis, status, severity, treatment, is_private)
VALUES ('2', '2025-04-15', 'Sobrecarga Isquios', 'Sobrecarga Isquios', 'Recuperada', 'medium', 'Rehabilitación estándar', false);

INSERT INTO injuries (player_id, date, type, diagnosis, status, severity, treatment, is_private)
VALUES ('2', '2025-01-15', 'Sobrecarga Isquios', 'Sobrecarga Isquios', 'Activa', 'medium', 'Rehabilitación estándar', false);

INSERT INTO injuries (player_id, date, type, diagnosis, status, severity, treatment, is_private)
VALUES ('2', '2025-09-15', 'Sobrecarga Isquios', 'Sobrecarga Isquios', 'Recuperada', 'medium', 'Rehabilitación estándar', false);

INSERT INTO medical_profiles (player_id, biometrics, anthropometry, rom, evaluation, physical_tests, general_info, extra_data)
VALUES (
  '3',
  '{"weight":"102.6","height":"214.4","age":22,"wingspan":"224.2"}'::jsonb,
  '{"fat":"7.6","muscle":"44.1","bone":"11.6","residual":"36.7","somatotype":{"endo":"2.0","meso":"7.9","ecto":"2.1"}}'::jsonb,
  '{"lower":{"Tobillo Flexión Dorsal":{"l":"42°","r":"44°","history":[{"date":"OCT 2025","val":"40° | 41°"}]},"Cadera Flexión":{"l":"115°","r":"112°","history":[{"date":"OCT 2025","val":"110° | 108°"}]},"Knee Extension":{"l":"0°","r":"0°","history":[{"date":"OCT 2025","val":"0° | -2°"}]}},"upper":{"Hombro Flexión":{"l":"175°","r":"178°","history":[{"date":"JUN 2025","val":"170° | 172°"}]},"Hombro Rot. Interna":{"l":"65°","r":"62°","history":[{"date":"JUN 2025","val":"60° | 58°"}]}}}'::jsonb,
  '{"UPPER BODY":{"score":"8.5","desc":"Sin asimetrías detectadas. Excelente estabilidad.","history":[{"date":"OCT 2025","val":"8.2"}]},"SPINAL COLUMN":{"score":"7.8","desc":"Control motor adecuado en movimientos dinámicos.","history":[{"date":"OCT 2025","val":"7.5"}]},"LOWER BODY":{"score":"9.0","desc":"Potencia explosiva en rango óptimo.","history":[{"date":"OCT 2025","val":"8.5"}]},"ABS / CORE":{"score":"8.0","desc":"Estabilidad central sólida en anti-rotación.","history":[{"date":"OCT 2025","val":"7.8"}]}}'::jsonb,
  '{"jump":{"history":[{"date":"15 DIC","value":"42"},{"date":"01 DIC","value":"40"},{"date":"15 NOV","value":"43"},{"date":"01 NOV","value":"41"}],"comments":"Mejora constante en la potencia reactiva."},"hopTest":{"history":[{"date":"15 DIC","lVal":"185","rVal":"182","asymmetry":"1.6%"},{"date":"01 DIC","lVal":"180","rVal":"178","asymmetry":"1.1%"}],"comments":"Asimetría dentro de los rangos de normalidad (<5%)."},"strengthPeaks":{"history":[{"date":"15 DIC","isometric":"450","eccentric":"510"},{"date":"01 DIC","isometric":"435","eccentric":"495"}],"comments":"Pico de fuerza isométrica en niveles óptimos."},"custom":[{"name":"Grip Strength","value":"65","unit":"kg","date":"15 DIC"}]}'::jsonb,
  '{"medication":["Aspirina 100mg","Vitamina D3"],"supplementation":["Proteína Whey","Creatina"],"allergies":["Ninguna conocida"],"previousInjuries":["Esguince leve (2022)"],"familyHistory":["Ninguno relevante"],"personalHistory":["Operado de apéndice"]}'::jsonb,
  '{"extra":{"aiReports":[{"title":"Análisis de Recuperación Semanal","date":"15 Dic 2025","type":"Weekly"},{"title":"Predicción de Riesgo de Lesión","date":"01 Dic 2025","type":"Risk"}],"questionnaires":[{"date":"20 DIC 2025","name":"Well-being (WBQ)","score":"85/100","status":"Completo"},{"date":"19 DIC 2025","name":"Well-being (WBQ)","score":"82/100","status":"Completo"},{"date":"18 DIC 2025","name":"Well-being (WBQ)","score":"88/100","status":"Completo"}]},"extraTests":{"selected":["ECOGRAFÍA","RESONANCIA MAGNÉTICA (RMN)"],"comment":"Resultados pendientes de revisión por el especialista. El jugador presenta molestias leves en la zona."}}'::jsonb
) ON CONFLICT (player_id) DO NOTHING;

INSERT INTO injuries (player_id, date, type, diagnosis, status, severity, treatment, is_private)
VALUES ('3', '2025-10-15', 'Esguince Tobillo', 'Esguince Tobillo', 'Recuperada', 'medium', 'Rehabilitación estándar', false);

INSERT INTO injuries (player_id, date, type, diagnosis, status, severity, treatment, is_private)
VALUES ('3', '2025-09-15', 'Esguince Tobillo', 'Esguince Tobillo', 'Recuperada', 'medium', 'Rehabilitación estándar', true);

INSERT INTO injuries (player_id, date, type, diagnosis, status, severity, treatment, is_private)
VALUES ('3', '2025-11-15', 'Sobrecarga Isquios', 'Sobrecarga Isquios', 'Recuperada', 'medium', 'Rehabilitación estándar', false);

INSERT INTO medical_profiles (player_id, biometrics, anthropometry, rom, evaluation, physical_tests, general_info, extra_data)
VALUES (
  '4',
  '{"weight":"106.9","height":"214.0","age":21,"wingspan":"223.9"}'::jsonb,
  '{"fat":"13.0","muscle":"44.8","bone":"11.7","residual":"30.5","somatotype":{"endo":"2.5","meso":"7.4","ecto":"1.5"}}'::jsonb,
  '{"lower":{"Tobillo Flexión Dorsal":{"l":"42°","r":"44°","history":[{"date":"OCT 2025","val":"40° | 41°"}]},"Cadera Flexión":{"l":"115°","r":"112°","history":[{"date":"OCT 2025","val":"110° | 108°"}]},"Knee Extension":{"l":"0°","r":"0°","history":[{"date":"OCT 2025","val":"0° | -2°"}]}},"upper":{"Hombro Flexión":{"l":"175°","r":"178°","history":[{"date":"JUN 2025","val":"170° | 172°"}]},"Hombro Rot. Interna":{"l":"65°","r":"62°","history":[{"date":"JUN 2025","val":"60° | 58°"}]}}}'::jsonb,
  '{"UPPER BODY":{"score":"8.5","desc":"Sin asimetrías detectadas. Excelente estabilidad.","history":[{"date":"OCT 2025","val":"8.2"}]},"SPINAL COLUMN":{"score":"7.8","desc":"Control motor adecuado en movimientos dinámicos.","history":[{"date":"OCT 2025","val":"7.5"}]},"LOWER BODY":{"score":"9.0","desc":"Potencia explosiva en rango óptimo.","history":[{"date":"OCT 2025","val":"8.5"}]},"ABS / CORE":{"score":"8.0","desc":"Estabilidad central sólida en anti-rotación.","history":[{"date":"OCT 2025","val":"7.8"}]}}'::jsonb,
  '{"jump":{"history":[{"date":"15 DIC","value":"42"},{"date":"01 DIC","value":"40"},{"date":"15 NOV","value":"43"},{"date":"01 NOV","value":"41"}],"comments":"Mejora constante en la potencia reactiva."},"hopTest":{"history":[{"date":"15 DIC","lVal":"185","rVal":"182","asymmetry":"1.6%"},{"date":"01 DIC","lVal":"180","rVal":"178","asymmetry":"1.1%"}],"comments":"Asimetría dentro de los rangos de normalidad (<5%)."},"strengthPeaks":{"history":[{"date":"15 DIC","isometric":"450","eccentric":"510"},{"date":"01 DIC","isometric":"435","eccentric":"495"}],"comments":"Pico de fuerza isométrica en niveles óptimos."},"custom":[{"name":"Grip Strength","value":"65","unit":"kg","date":"15 DIC"}]}'::jsonb,
  '{"medication":["Aspirina 100mg","Vitamina D3"],"supplementation":["Proteína Whey","Creatina"],"allergies":["Ninguna conocida"],"previousInjuries":["Esguince leve (2022)"],"familyHistory":["Ninguno relevante"],"personalHistory":["Operado de apéndice"]}'::jsonb,
  '{"extra":{"aiReports":[{"title":"Análisis de Recuperación Semanal","date":"15 Dic 2025","type":"Weekly"},{"title":"Predicción de Riesgo de Lesión","date":"01 Dic 2025","type":"Risk"}],"questionnaires":[{"date":"20 DIC 2025","name":"Well-being (WBQ)","score":"85/100","status":"Completo"},{"date":"19 DIC 2025","name":"Well-being (WBQ)","score":"82/100","status":"Completo"},{"date":"18 DIC 2025","name":"Well-being (WBQ)","score":"88/100","status":"Completo"}]},"extraTests":{"selected":["ECOGRAFÍA","RESONANCIA MAGNÉTICA (RMN)"],"comment":"Resultados pendientes de revisión por el especialista. El jugador presenta molestias leves en la zona."}}'::jsonb
) ON CONFLICT (player_id) DO NOTHING;

INSERT INTO injuries (player_id, date, type, diagnosis, status, severity, treatment, is_private)
VALUES ('4', '2025-11-15', 'Sobrecarga Isquios', 'Sobrecarga Isquios', 'Recuperada', 'medium', 'Rehabilitación estándar', false);

INSERT INTO injuries (player_id, date, type, diagnosis, status, severity, treatment, is_private)
VALUES ('4', '2025-05-15', 'Sobrecarga Isquios', 'Sobrecarga Isquios', 'Recuperada', 'medium', 'Rehabilitación estándar', false);

INSERT INTO injuries (player_id, date, type, diagnosis, status, severity, treatment, is_private)
VALUES ('4', '2025-02-15', 'Sobrecarga Isquios', 'Sobrecarga Isquios', 'Recuperada', 'medium', 'Rehabilitación estándar', false);

INSERT INTO medical_profiles (player_id, biometrics, anthropometry, rom, evaluation, physical_tests, general_info, extra_data)
VALUES (
  '5',
  '{"weight":"109.6","height":"190.9","age":24,"wingspan":"196.9"}'::jsonb,
  '{"fat":"9.0","muscle":"46.5","bone":"13.1","residual":"31.4","somatotype":{"endo":"3.3","meso":"4.0","ecto":"1.4"}}'::jsonb,
  '{"lower":{"Tobillo Flexión Dorsal":{"l":"42°","r":"44°","history":[{"date":"OCT 2025","val":"40° | 41°"}]},"Cadera Flexión":{"l":"115°","r":"112°","history":[{"date":"OCT 2025","val":"110° | 108°"}]},"Knee Extension":{"l":"0°","r":"0°","history":[{"date":"OCT 2025","val":"0° | -2°"}]}},"upper":{"Hombro Flexión":{"l":"175°","r":"178°","history":[{"date":"JUN 2025","val":"170° | 172°"}]},"Hombro Rot. Interna":{"l":"65°","r":"62°","history":[{"date":"JUN 2025","val":"60° | 58°"}]}}}'::jsonb,
  '{"UPPER BODY":{"score":"8.5","desc":"Sin asimetrías detectadas. Excelente estabilidad.","history":[{"date":"OCT 2025","val":"8.2"}]},"SPINAL COLUMN":{"score":"7.8","desc":"Control motor adecuado en movimientos dinámicos.","history":[{"date":"OCT 2025","val":"7.5"}]},"LOWER BODY":{"score":"9.0","desc":"Potencia explosiva en rango óptimo.","history":[{"date":"OCT 2025","val":"8.5"}]},"ABS / CORE":{"score":"8.0","desc":"Estabilidad central sólida en anti-rotación.","history":[{"date":"OCT 2025","val":"7.8"}]}}'::jsonb,
  '{"jump":{"history":[{"date":"15 DIC","value":"42"},{"date":"01 DIC","value":"40"},{"date":"15 NOV","value":"43"},{"date":"01 NOV","value":"41"}],"comments":"Mejora constante en la potencia reactiva."},"hopTest":{"history":[{"date":"15 DIC","lVal":"185","rVal":"182","asymmetry":"1.6%"},{"date":"01 DIC","lVal":"180","rVal":"178","asymmetry":"1.1%"}],"comments":"Asimetría dentro de los rangos de normalidad (<5%)."},"strengthPeaks":{"history":[{"date":"15 DIC","isometric":"450","eccentric":"510"},{"date":"01 DIC","isometric":"435","eccentric":"495"}],"comments":"Pico de fuerza isométrica en niveles óptimos."},"custom":[{"name":"Grip Strength","value":"65","unit":"kg","date":"15 DIC"}]}'::jsonb,
  '{"medication":["Aspirina 100mg","Vitamina D3"],"supplementation":["Proteína Whey","Creatina"],"allergies":["Ninguna conocida"],"previousInjuries":["Esguince leve (2022)"],"familyHistory":["Ninguno relevante"],"personalHistory":["Operado de apéndice"]}'::jsonb,
  '{"extra":{"aiReports":[{"title":"Análisis de Recuperación Semanal","date":"15 Dic 2025","type":"Weekly"},{"title":"Predicción de Riesgo de Lesión","date":"01 Dic 2025","type":"Risk"}],"questionnaires":[{"date":"20 DIC 2025","name":"Well-being (WBQ)","score":"85/100","status":"Completo"},{"date":"19 DIC 2025","name":"Well-being (WBQ)","score":"82/100","status":"Completo"},{"date":"18 DIC 2025","name":"Well-being (WBQ)","score":"88/100","status":"Completo"}]},"extraTests":{"selected":["ECOGRAFÍA","RESONANCIA MAGNÉTICA (RMN)"],"comment":"Resultados pendientes de revisión por el especialista. El jugador presenta molestias leves en la zona."}}'::jsonb
) ON CONFLICT (player_id) DO NOTHING;

INSERT INTO injuries (player_id, date, type, diagnosis, status, severity, treatment, is_private)
VALUES ('5', '2025-02-15', 'Sobrecarga Isquios', 'Sobrecarga Isquios', 'Recuperada', 'medium', 'Rehabilitación estándar', false);

INSERT INTO injuries (player_id, date, type, diagnosis, status, severity, treatment, is_private)
VALUES ('5', '2025-05-15', 'Esguince Tobillo', 'Esguince Tobillo', 'Recuperada', 'medium', 'Rehabilitación estándar', false);

INSERT INTO injuries (player_id, date, type, diagnosis, status, severity, treatment, is_private)
VALUES ('5', '2025-01-15', 'Sobrecarga Isquios', 'Sobrecarga Isquios', 'Recuperada', 'medium', 'Rehabilitación estándar', false);

INSERT INTO medical_profiles (player_id, biometrics, anthropometry, rom, evaluation, physical_tests, general_info, extra_data)
VALUES (
  '6',
  '{"weight":"88.3","height":"199.4","age":20,"wingspan":"206.8"}'::jsonb,
  '{"fat":"12.4","muscle":"42.7","bone":"13.0","residual":"31.9","somatotype":{"endo":"1.6","meso":"4.0","ecto":"2.6"}}'::jsonb,
  '{"lower":{"Tobillo Flexión Dorsal":{"l":"42°","r":"44°","history":[{"date":"OCT 2025","val":"40° | 41°"}]},"Cadera Flexión":{"l":"115°","r":"112°","history":[{"date":"OCT 2025","val":"110° | 108°"}]},"Knee Extension":{"l":"0°","r":"0°","history":[{"date":"OCT 2025","val":"0° | -2°"}]}},"upper":{"Hombro Flexión":{"l":"175°","r":"178°","history":[{"date":"JUN 2025","val":"170° | 172°"}]},"Hombro Rot. Interna":{"l":"65°","r":"62°","history":[{"date":"JUN 2025","val":"60° | 58°"}]}}}'::jsonb,
  '{"UPPER BODY":{"score":"8.5","desc":"Sin asimetrías detectadas. Excelente estabilidad.","history":[{"date":"OCT 2025","val":"8.2"}]},"SPINAL COLUMN":{"score":"7.8","desc":"Control motor adecuado en movimientos dinámicos.","history":[{"date":"OCT 2025","val":"7.5"}]},"LOWER BODY":{"score":"9.0","desc":"Potencia explosiva en rango óptimo.","history":[{"date":"OCT 2025","val":"8.5"}]},"ABS / CORE":{"score":"8.0","desc":"Estabilidad central sólida en anti-rotación.","history":[{"date":"OCT 2025","val":"7.8"}]}}'::jsonb,
  '{"jump":{"history":[{"date":"15 DIC","value":"42"},{"date":"01 DIC","value":"40"},{"date":"15 NOV","value":"43"},{"date":"01 NOV","value":"41"}],"comments":"Mejora constante en la potencia reactiva."},"hopTest":{"history":[{"date":"15 DIC","lVal":"185","rVal":"182","asymmetry":"1.6%"},{"date":"01 DIC","lVal":"180","rVal":"178","asymmetry":"1.1%"}],"comments":"Asimetría dentro de los rangos de normalidad (<5%)."},"strengthPeaks":{"history":[{"date":"15 DIC","isometric":"450","eccentric":"510"},{"date":"01 DIC","isometric":"435","eccentric":"495"}],"comments":"Pico de fuerza isométrica en niveles óptimos."},"custom":[{"name":"Grip Strength","value":"65","unit":"kg","date":"15 DIC"}]}'::jsonb,
  '{"medication":["Aspirina 100mg","Vitamina D3"],"supplementation":["Proteína Whey","Creatina"],"allergies":["Ninguna conocida"],"previousInjuries":["Esguince leve (2022)"],"familyHistory":["Ninguno relevante"],"personalHistory":["Operado de apéndice"]}'::jsonb,
  '{"extra":{"aiReports":[{"title":"Análisis de Recuperación Semanal","date":"15 Dic 2025","type":"Weekly"},{"title":"Predicción de Riesgo de Lesión","date":"01 Dic 2025","type":"Risk"}],"questionnaires":[{"date":"20 DIC 2025","name":"Well-being (WBQ)","score":"85/100","status":"Completo"},{"date":"19 DIC 2025","name":"Well-being (WBQ)","score":"82/100","status":"Completo"},{"date":"18 DIC 2025","name":"Well-being (WBQ)","score":"88/100","status":"Completo"}]},"extraTests":{"selected":["ECOGRAFÍA","RESONANCIA MAGNÉTICA (RMN)"],"comment":"Resultados pendientes de revisión por el especialista. El jugador presenta molestias leves en la zona."}}'::jsonb
) ON CONFLICT (player_id) DO NOTHING;

INSERT INTO injuries (player_id, date, type, diagnosis, status, severity, treatment, is_private)
VALUES ('6', '2025-08-15', 'Esguince Tobillo', 'Esguince Tobillo', 'Activa', 'medium', 'Rehabilitación estándar', false);

INSERT INTO injuries (player_id, date, type, diagnosis, status, severity, treatment, is_private)
VALUES ('6', '2025-01-15', 'Esguince Tobillo', 'Esguince Tobillo', 'Recuperada', 'medium', 'Rehabilitación estándar', false);

INSERT INTO injuries (player_id, date, type, diagnosis, status, severity, treatment, is_private)
VALUES ('6', '2025-10-15', 'Sobrecarga Isquios', 'Sobrecarga Isquios', 'Recuperada', 'medium', 'Rehabilitación estándar', false);

INSERT INTO medical_profiles (player_id, biometrics, anthropometry, rom, evaluation, physical_tests, general_info, extra_data)
VALUES (
  '7',
  '{"weight":"92.1","height":"212.8","age":19,"wingspan":"222.4"}'::jsonb,
  '{"fat":"9.4","muscle":"46.7","bone":"12.7","residual":"31.2","somatotype":{"endo":"2.8","meso":"7.1","ecto":"2.0"}}'::jsonb,
  '{"lower":{"Tobillo Flexión Dorsal":{"l":"42°","r":"44°","history":[{"date":"OCT 2025","val":"40° | 41°"}]},"Cadera Flexión":{"l":"115°","r":"112°","history":[{"date":"OCT 2025","val":"110° | 108°"}]},"Knee Extension":{"l":"0°","r":"0°","history":[{"date":"OCT 2025","val":"0° | -2°"}]}},"upper":{"Hombro Flexión":{"l":"175°","r":"178°","history":[{"date":"JUN 2025","val":"170° | 172°"}]},"Hombro Rot. Interna":{"l":"65°","r":"62°","history":[{"date":"JUN 2025","val":"60° | 58°"}]}}}'::jsonb,
  '{"UPPER BODY":{"score":"8.5","desc":"Sin asimetrías detectadas. Excelente estabilidad.","history":[{"date":"OCT 2025","val":"8.2"}]},"SPINAL COLUMN":{"score":"7.8","desc":"Control motor adecuado en movimientos dinámicos.","history":[{"date":"OCT 2025","val":"7.5"}]},"LOWER BODY":{"score":"9.0","desc":"Potencia explosiva en rango óptimo.","history":[{"date":"OCT 2025","val":"8.5"}]},"ABS / CORE":{"score":"8.0","desc":"Estabilidad central sólida en anti-rotación.","history":[{"date":"OCT 2025","val":"7.8"}]}}'::jsonb,
  '{"jump":{"history":[{"date":"15 DIC","value":"42"},{"date":"01 DIC","value":"40"},{"date":"15 NOV","value":"43"},{"date":"01 NOV","value":"41"}],"comments":"Mejora constante en la potencia reactiva."},"hopTest":{"history":[{"date":"15 DIC","lVal":"185","rVal":"182","asymmetry":"1.6%"},{"date":"01 DIC","lVal":"180","rVal":"178","asymmetry":"1.1%"}],"comments":"Asimetría dentro de los rangos de normalidad (<5%)."},"strengthPeaks":{"history":[{"date":"15 DIC","isometric":"450","eccentric":"510"},{"date":"01 DIC","isometric":"435","eccentric":"495"}],"comments":"Pico de fuerza isométrica en niveles óptimos."},"custom":[{"name":"Grip Strength","value":"65","unit":"kg","date":"15 DIC"}]}'::jsonb,
  '{"medication":["Aspirina 100mg","Vitamina D3"],"supplementation":["Proteína Whey","Creatina"],"allergies":["Ninguna conocida"],"previousInjuries":["Esguince leve (2022)"],"familyHistory":["Ninguno relevante"],"personalHistory":["Operado de apéndice"]}'::jsonb,
  '{"extra":{"aiReports":[{"title":"Análisis de Recuperación Semanal","date":"15 Dic 2025","type":"Weekly"},{"title":"Predicción de Riesgo de Lesión","date":"01 Dic 2025","type":"Risk"}],"questionnaires":[{"date":"20 DIC 2025","name":"Well-being (WBQ)","score":"85/100","status":"Completo"},{"date":"19 DIC 2025","name":"Well-being (WBQ)","score":"82/100","status":"Completo"},{"date":"18 DIC 2025","name":"Well-being (WBQ)","score":"88/100","status":"Completo"}]},"extraTests":{"selected":["ECOGRAFÍA","RESONANCIA MAGNÉTICA (RMN)"],"comment":"Resultados pendientes de revisión por el especialista. El jugador presenta molestias leves en la zona."}}'::jsonb
) ON CONFLICT (player_id) DO NOTHING;

INSERT INTO injuries (player_id, date, type, diagnosis, status, severity, treatment, is_private)
VALUES ('7', '2025-07-15', 'Esguince Tobillo', 'Esguince Tobillo', 'Activa', 'medium', 'Rehabilitación estándar', false);

INSERT INTO injuries (player_id, date, type, diagnosis, status, severity, treatment, is_private)
VALUES ('7', '2025-06-15', 'Sobrecarga Isquios', 'Sobrecarga Isquios', 'Recuperada', 'medium', 'Rehabilitación estándar', false);

INSERT INTO injuries (player_id, date, type, diagnosis, status, severity, treatment, is_private)
VALUES ('7', '2025-02-15', 'Sobrecarga Isquios', 'Sobrecarga Isquios', 'Recuperada', 'medium', 'Rehabilitación estándar', false);

INSERT INTO medical_profiles (player_id, biometrics, anthropometry, rom, evaluation, physical_tests, general_info, extra_data)
VALUES (
  '8',
  '{"weight":"99.2","height":"208.2","age":30,"wingspan":"217.0"}'::jsonb,
  '{"fat":"12.0","muscle":"42.0","bone":"12.7","residual":"33.3","somatotype":{"endo":"2.6","meso":"7.9","ecto":"1.4"}}'::jsonb,
  '{"lower":{"Tobillo Flexión Dorsal":{"l":"42°","r":"44°","history":[{"date":"OCT 2025","val":"40° | 41°"}]},"Cadera Flexión":{"l":"115°","r":"112°","history":[{"date":"OCT 2025","val":"110° | 108°"}]},"Knee Extension":{"l":"0°","r":"0°","history":[{"date":"OCT 2025","val":"0° | -2°"}]}},"upper":{"Hombro Flexión":{"l":"175°","r":"178°","history":[{"date":"JUN 2025","val":"170° | 172°"}]},"Hombro Rot. Interna":{"l":"65°","r":"62°","history":[{"date":"JUN 2025","val":"60° | 58°"}]}}}'::jsonb,
  '{"UPPER BODY":{"score":"8.5","desc":"Sin asimetrías detectadas. Excelente estabilidad.","history":[{"date":"OCT 2025","val":"8.2"}]},"SPINAL COLUMN":{"score":"7.8","desc":"Control motor adecuado en movimientos dinámicos.","history":[{"date":"OCT 2025","val":"7.5"}]},"LOWER BODY":{"score":"9.0","desc":"Potencia explosiva en rango óptimo.","history":[{"date":"OCT 2025","val":"8.5"}]},"ABS / CORE":{"score":"8.0","desc":"Estabilidad central sólida en anti-rotación.","history":[{"date":"OCT 2025","val":"7.8"}]}}'::jsonb,
  '{"jump":{"history":[{"date":"15 DIC","value":"42"},{"date":"01 DIC","value":"40"},{"date":"15 NOV","value":"43"},{"date":"01 NOV","value":"41"}],"comments":"Mejora constante en la potencia reactiva."},"hopTest":{"history":[{"date":"15 DIC","lVal":"185","rVal":"182","asymmetry":"1.6%"},{"date":"01 DIC","lVal":"180","rVal":"178","asymmetry":"1.1%"}],"comments":"Asimetría dentro de los rangos de normalidad (<5%)."},"strengthPeaks":{"history":[{"date":"15 DIC","isometric":"450","eccentric":"510"},{"date":"01 DIC","isometric":"435","eccentric":"495"}],"comments":"Pico de fuerza isométrica en niveles óptimos."},"custom":[{"name":"Grip Strength","value":"65","unit":"kg","date":"15 DIC"}]}'::jsonb,
  '{"medication":["Aspirina 100mg","Vitamina D3"],"supplementation":["Proteína Whey","Creatina"],"allergies":["Ninguna conocida"],"previousInjuries":["Esguince leve (2022)"],"familyHistory":["Ninguno relevante"],"personalHistory":["Operado de apéndice"]}'::jsonb,
  '{"extra":{"aiReports":[{"title":"Análisis de Recuperación Semanal","date":"15 Dic 2025","type":"Weekly"},{"title":"Predicción de Riesgo de Lesión","date":"01 Dic 2025","type":"Risk"}],"questionnaires":[{"date":"20 DIC 2025","name":"Well-being (WBQ)","score":"85/100","status":"Completo"},{"date":"19 DIC 2025","name":"Well-being (WBQ)","score":"82/100","status":"Completo"},{"date":"18 DIC 2025","name":"Well-being (WBQ)","score":"88/100","status":"Completo"}]},"extraTests":{"selected":["ANALÍTICA SANGUÍNEA"],"comment":"Resultados pendientes de revisión por el especialista. El jugador presenta molestias leves en la zona."}}'::jsonb
) ON CONFLICT (player_id) DO NOTHING;

INSERT INTO injuries (player_id, date, type, diagnosis, status, severity, treatment, is_private)
VALUES ('8', '2025-02-15', 'Sobrecarga Isquios', 'Sobrecarga Isquios', 'Recuperada', 'medium', 'Rehabilitación estándar', false);

INSERT INTO injuries (player_id, date, type, diagnosis, status, severity, treatment, is_private)
VALUES ('8', '2025-02-15', 'Sobrecarga Isquios', 'Sobrecarga Isquios', 'Recuperada', 'medium', 'Rehabilitación estándar', true);

INSERT INTO injuries (player_id, date, type, diagnosis, status, severity, treatment, is_private)
VALUES ('8', '2025-09-15', 'Esguince Tobillo', 'Esguince Tobillo', 'Recuperada', 'medium', 'Rehabilitación estándar', false);

INSERT INTO medical_profiles (player_id, biometrics, anthropometry, rom, evaluation, physical_tests, general_info, extra_data)
VALUES (
  '9',
  '{"weight":"104.1","height":"192.5","age":29,"wingspan":"198.8"}'::jsonb,
  '{"fat":"9.1","muscle":"44.8","bone":"10.3","residual":"35.8","somatotype":{"endo":"3.4","meso":"7.8","ecto":"2.1"}}'::jsonb,
  '{"lower":{"Tobillo Flexión Dorsal":{"l":"42°","r":"44°","history":[{"date":"OCT 2025","val":"40° | 41°"}]},"Cadera Flexión":{"l":"115°","r":"112°","history":[{"date":"OCT 2025","val":"110° | 108°"}]},"Knee Extension":{"l":"0°","r":"0°","history":[{"date":"OCT 2025","val":"0° | -2°"}]}},"upper":{"Hombro Flexión":{"l":"175°","r":"178°","history":[{"date":"JUN 2025","val":"170° | 172°"}]},"Hombro Rot. Interna":{"l":"65°","r":"62°","history":[{"date":"JUN 2025","val":"60° | 58°"}]}}}'::jsonb,
  '{"UPPER BODY":{"score":"8.5","desc":"Sin asimetrías detectadas. Excelente estabilidad.","history":[{"date":"OCT 2025","val":"8.2"}]},"SPINAL COLUMN":{"score":"7.8","desc":"Control motor adecuado en movimientos dinámicos.","history":[{"date":"OCT 2025","val":"7.5"}]},"LOWER BODY":{"score":"9.0","desc":"Potencia explosiva en rango óptimo.","history":[{"date":"OCT 2025","val":"8.5"}]},"ABS / CORE":{"score":"8.0","desc":"Estabilidad central sólida en anti-rotación.","history":[{"date":"OCT 2025","val":"7.8"}]}}'::jsonb,
  '{"jump":{"history":[{"date":"15 DIC","value":"42"},{"date":"01 DIC","value":"40"},{"date":"15 NOV","value":"43"},{"date":"01 NOV","value":"41"}],"comments":"Mejora constante en la potencia reactiva."},"hopTest":{"history":[{"date":"15 DIC","lVal":"185","rVal":"182","asymmetry":"1.6%"},{"date":"01 DIC","lVal":"180","rVal":"178","asymmetry":"1.1%"}],"comments":"Asimetría dentro de los rangos de normalidad (<5%)."},"strengthPeaks":{"history":[{"date":"15 DIC","isometric":"450","eccentric":"510"},{"date":"01 DIC","isometric":"435","eccentric":"495"}],"comments":"Pico de fuerza isométrica en niveles óptimos."},"custom":[{"name":"Grip Strength","value":"65","unit":"kg","date":"15 DIC"}]}'::jsonb,
  '{"medication":["Aspirina 100mg","Vitamina D3"],"supplementation":["Proteína Whey","Creatina"],"allergies":["Ninguna conocida"],"previousInjuries":["Esguince leve (2022)"],"familyHistory":["Ninguno relevante"],"personalHistory":["Operado de apéndice"]}'::jsonb,
  '{"extra":{"aiReports":[{"title":"Análisis de Recuperación Semanal","date":"15 Dic 2025","type":"Weekly"},{"title":"Predicción de Riesgo de Lesión","date":"01 Dic 2025","type":"Risk"}],"questionnaires":[{"date":"20 DIC 2025","name":"Well-being (WBQ)","score":"85/100","status":"Completo"},{"date":"19 DIC 2025","name":"Well-being (WBQ)","score":"82/100","status":"Completo"},{"date":"18 DIC 2025","name":"Well-being (WBQ)","score":"88/100","status":"Completo"}]},"extraTests":{"selected":["ANALÍTICA SANGUÍNEA"],"comment":"Resultados pendientes de revisión por el especialista. El jugador presenta molestias leves en la zona."}}'::jsonb
) ON CONFLICT (player_id) DO NOTHING;

INSERT INTO injuries (player_id, date, type, diagnosis, status, severity, treatment, is_private)
VALUES ('9', '2025-09-15', 'Sobrecarga Isquios', 'Sobrecarga Isquios', 'Recuperada', 'medium', 'Rehabilitación estándar', true);

INSERT INTO injuries (player_id, date, type, diagnosis, status, severity, treatment, is_private)
VALUES ('9', '2025-05-15', 'Sobrecarga Isquios', 'Sobrecarga Isquios', 'Recuperada', 'medium', 'Rehabilitación estándar', false);

INSERT INTO injuries (player_id, date, type, diagnosis, status, severity, treatment, is_private)
VALUES ('9', '2025-03-15', 'Sobrecarga Isquios', 'Sobrecarga Isquios', 'Recuperada', 'medium', 'Rehabilitación estándar', false);

INSERT INTO medical_profiles (player_id, biometrics, anthropometry, rom, evaluation, physical_tests, general_info, extra_data)
VALUES (
  '10',
  '{"weight":"94.9","height":"202.3","age":32,"wingspan":"210.2"}'::jsonb,
  '{"fat":"8.9","muscle":"44.2","bone":"10.3","residual":"36.6","somatotype":{"endo":"2.8","meso":"7.8","ecto":"1.7"}}'::jsonb,
  '{"lower":{"Tobillo Flexión Dorsal":{"l":"42°","r":"44°","history":[{"date":"OCT 2025","val":"40° | 41°"}]},"Cadera Flexión":{"l":"115°","r":"112°","history":[{"date":"OCT 2025","val":"110° | 108°"}]},"Knee Extension":{"l":"0°","r":"0°","history":[{"date":"OCT 2025","val":"0° | -2°"}]}},"upper":{"Hombro Flexión":{"l":"175°","r":"178°","history":[{"date":"JUN 2025","val":"170° | 172°"}]},"Hombro Rot. Interna":{"l":"65°","r":"62°","history":[{"date":"JUN 2025","val":"60° | 58°"}]}}}'::jsonb,
  '{"UPPER BODY":{"score":"8.5","desc":"Sin asimetrías detectadas. Excelente estabilidad.","history":[{"date":"OCT 2025","val":"8.2"}]},"SPINAL COLUMN":{"score":"7.8","desc":"Control motor adecuado en movimientos dinámicos.","history":[{"date":"OCT 2025","val":"7.5"}]},"LOWER BODY":{"score":"9.0","desc":"Potencia explosiva en rango óptimo.","history":[{"date":"OCT 2025","val":"8.5"}]},"ABS / CORE":{"score":"8.0","desc":"Estabilidad central sólida en anti-rotación.","history":[{"date":"OCT 2025","val":"7.8"}]}}'::jsonb,
  '{"jump":{"history":[{"date":"15 DIC","value":"42"},{"date":"01 DIC","value":"40"},{"date":"15 NOV","value":"43"},{"date":"01 NOV","value":"41"}],"comments":"Mejora constante en la potencia reactiva."},"hopTest":{"history":[{"date":"15 DIC","lVal":"185","rVal":"182","asymmetry":"1.6%"},{"date":"01 DIC","lVal":"180","rVal":"178","asymmetry":"1.1%"}],"comments":"Asimetría dentro de los rangos de normalidad (<5%)."},"strengthPeaks":{"history":[{"date":"15 DIC","isometric":"450","eccentric":"510"},{"date":"01 DIC","isometric":"435","eccentric":"495"}],"comments":"Pico de fuerza isométrica en niveles óptimos."},"custom":[{"name":"Grip Strength","value":"65","unit":"kg","date":"15 DIC"}]}'::jsonb,
  '{"medication":["Aspirina 100mg","Vitamina D3"],"supplementation":["Proteína Whey","Creatina"],"allergies":["Ninguna conocida"],"previousInjuries":["Esguince leve (2022)"],"familyHistory":["Ninguno relevante"],"personalHistory":["Operado de apéndice"]}'::jsonb,
  '{"extra":{"aiReports":[{"title":"Análisis de Recuperación Semanal","date":"15 Dic 2025","type":"Weekly"},{"title":"Predicción de Riesgo de Lesión","date":"01 Dic 2025","type":"Risk"}],"questionnaires":[{"date":"20 DIC 2025","name":"Well-being (WBQ)","score":"85/100","status":"Completo"},{"date":"19 DIC 2025","name":"Well-being (WBQ)","score":"82/100","status":"Completo"},{"date":"18 DIC 2025","name":"Well-being (WBQ)","score":"88/100","status":"Completo"}]},"extraTests":{"selected":["ANALÍTICA SANGUÍNEA"],"comment":"Resultados pendientes de revisión por el especialista. El jugador presenta molestias leves en la zona."}}'::jsonb
) ON CONFLICT (player_id) DO NOTHING;

INSERT INTO injuries (player_id, date, type, diagnosis, status, severity, treatment, is_private)
VALUES ('10', '2025-10-15', 'Esguince Tobillo', 'Esguince Tobillo', 'Activa', 'medium', 'Rehabilitación estándar', false);

INSERT INTO injuries (player_id, date, type, diagnosis, status, severity, treatment, is_private)
VALUES ('10', '2025-05-15', 'Sobrecarga Isquios', 'Sobrecarga Isquios', 'Recuperada', 'medium', 'Rehabilitación estándar', true);

INSERT INTO injuries (player_id, date, type, diagnosis, status, severity, treatment, is_private)
VALUES ('10', '2025-08-15', 'Sobrecarga Isquios', 'Sobrecarga Isquios', 'Recuperada', 'medium', 'Rehabilitación estándar', false);

INSERT INTO medical_profiles (player_id, biometrics, anthropometry, rom, evaluation, physical_tests, general_info, extra_data)
VALUES (
  '11',
  '{"weight":"83.1","height":"208.4","age":24,"wingspan":"217.3"}'::jsonb,
  '{"fat":"13.2","muscle":"49.8","bone":"12.7","residual":"24.3","somatotype":{"endo":"2.5","meso":"4.3","ecto":"1.5"}}'::jsonb,
  '{"lower":{"Tobillo Flexión Dorsal":{"l":"42°","r":"44°","history":[{"date":"OCT 2025","val":"40° | 41°"}]},"Cadera Flexión":{"l":"115°","r":"112°","history":[{"date":"OCT 2025","val":"110° | 108°"}]},"Knee Extension":{"l":"0°","r":"0°","history":[{"date":"OCT 2025","val":"0° | -2°"}]}},"upper":{"Hombro Flexión":{"l":"175°","r":"178°","history":[{"date":"JUN 2025","val":"170° | 172°"}]},"Hombro Rot. Interna":{"l":"65°","r":"62°","history":[{"date":"JUN 2025","val":"60° | 58°"}]}}}'::jsonb,
  '{"UPPER BODY":{"score":"8.5","desc":"Sin asimetrías detectadas. Excelente estabilidad.","history":[{"date":"OCT 2025","val":"8.2"}]},"SPINAL COLUMN":{"score":"7.8","desc":"Control motor adecuado en movimientos dinámicos.","history":[{"date":"OCT 2025","val":"7.5"}]},"LOWER BODY":{"score":"9.0","desc":"Potencia explosiva en rango óptimo.","history":[{"date":"OCT 2025","val":"8.5"}]},"ABS / CORE":{"score":"8.0","desc":"Estabilidad central sólida en anti-rotación.","history":[{"date":"OCT 2025","val":"7.8"}]}}'::jsonb,
  '{"jump":{"history":[{"date":"15 DIC","value":"42"},{"date":"01 DIC","value":"40"},{"date":"15 NOV","value":"43"},{"date":"01 NOV","value":"41"}],"comments":"Mejora constante en la potencia reactiva."},"hopTest":{"history":[{"date":"15 DIC","lVal":"185","rVal":"182","asymmetry":"1.6%"},{"date":"01 DIC","lVal":"180","rVal":"178","asymmetry":"1.1%"}],"comments":"Asimetría dentro de los rangos de normalidad (<5%)."},"strengthPeaks":{"history":[{"date":"15 DIC","isometric":"450","eccentric":"510"},{"date":"01 DIC","isometric":"435","eccentric":"495"}],"comments":"Pico de fuerza isométrica en niveles óptimos."},"custom":[{"name":"Grip Strength","value":"65","unit":"kg","date":"15 DIC"}]}'::jsonb,
  '{"medication":["Aspirina 100mg","Vitamina D3"],"supplementation":["Proteína Whey","Creatina"],"allergies":["Ninguna conocida"],"previousInjuries":["Esguince leve (2022)"],"familyHistory":["Ninguno relevante"],"personalHistory":["Operado de apéndice"]}'::jsonb,
  '{"extra":{"aiReports":[{"title":"Análisis de Recuperación Semanal","date":"15 Dic 2025","type":"Weekly"},{"title":"Predicción de Riesgo de Lesión","date":"01 Dic 2025","type":"Risk"}],"questionnaires":[{"date":"20 DIC 2025","name":"Well-being (WBQ)","score":"85/100","status":"Completo"},{"date":"19 DIC 2025","name":"Well-being (WBQ)","score":"82/100","status":"Completo"},{"date":"18 DIC 2025","name":"Well-being (WBQ)","score":"88/100","status":"Completo"}]},"extraTests":{"selected":["ANALÍTICA SANGUÍNEA"],"comment":"Resultados pendientes de revisión por el especialista. El jugador presenta molestias leves en la zona."}}'::jsonb
) ON CONFLICT (player_id) DO NOTHING;

INSERT INTO injuries (player_id, date, type, diagnosis, status, severity, treatment, is_private)
VALUES ('11', '2025-02-15', 'Sobrecarga Isquios', 'Sobrecarga Isquios', 'Recuperada', 'medium', 'Rehabilitación estándar', false);

INSERT INTO injuries (player_id, date, type, diagnosis, status, severity, treatment, is_private)
VALUES ('11', '2025-02-15', 'Sobrecarga Isquios', 'Sobrecarga Isquios', 'Activa', 'medium', 'Rehabilitación estándar', true);

INSERT INTO injuries (player_id, date, type, diagnosis, status, severity, treatment, is_private)
VALUES ('11', '2025-11-15', 'Esguince Tobillo', 'Esguince Tobillo', 'Recuperada', 'medium', 'Rehabilitación estándar', false);

INSERT INTO medical_profiles (player_id, biometrics, anthropometry, rom, evaluation, physical_tests, general_info, extra_data)
VALUES (
  '12',
  '{"weight":"106.2","height":"193.8","age":25,"wingspan":"200.3"}'::jsonb,
  '{"fat":"14.5","muscle":"49.1","bone":"12.3","residual":"24.1","somatotype":{"endo":"2.7","meso":"4.5","ecto":"1.9"}}'::jsonb,
  '{"lower":{"Tobillo Flexión Dorsal":{"l":"42°","r":"44°","history":[{"date":"OCT 2025","val":"40° | 41°"}]},"Cadera Flexión":{"l":"115°","r":"112°","history":[{"date":"OCT 2025","val":"110° | 108°"}]},"Knee Extension":{"l":"0°","r":"0°","history":[{"date":"OCT 2025","val":"0° | -2°"}]}},"upper":{"Hombro Flexión":{"l":"175°","r":"178°","history":[{"date":"JUN 2025","val":"170° | 172°"}]},"Hombro Rot. Interna":{"l":"65°","r":"62°","history":[{"date":"JUN 2025","val":"60° | 58°"}]}}}'::jsonb,
  '{"UPPER BODY":{"score":"8.5","desc":"Sin asimetrías detectadas. Excelente estabilidad.","history":[{"date":"OCT 2025","val":"8.2"}]},"SPINAL COLUMN":{"score":"7.8","desc":"Control motor adecuado en movimientos dinámicos.","history":[{"date":"OCT 2025","val":"7.5"}]},"LOWER BODY":{"score":"9.0","desc":"Potencia explosiva en rango óptimo.","history":[{"date":"OCT 2025","val":"8.5"}]},"ABS / CORE":{"score":"8.0","desc":"Estabilidad central sólida en anti-rotación.","history":[{"date":"OCT 2025","val":"7.8"}]}}'::jsonb,
  '{"jump":{"history":[{"date":"15 DIC","value":"42"},{"date":"01 DIC","value":"40"},{"date":"15 NOV","value":"43"},{"date":"01 NOV","value":"41"}],"comments":"Mejora constante en la potencia reactiva."},"hopTest":{"history":[{"date":"15 DIC","lVal":"185","rVal":"182","asymmetry":"1.6%"},{"date":"01 DIC","lVal":"180","rVal":"178","asymmetry":"1.1%"}],"comments":"Asimetría dentro de los rangos de normalidad (<5%)."},"strengthPeaks":{"history":[{"date":"15 DIC","isometric":"450","eccentric":"510"},{"date":"01 DIC","isometric":"435","eccentric":"495"}],"comments":"Pico de fuerza isométrica en niveles óptimos."},"custom":[{"name":"Grip Strength","value":"65","unit":"kg","date":"15 DIC"}]}'::jsonb,
  '{"medication":["Aspirina 100mg","Vitamina D3"],"supplementation":["Proteína Whey","Creatina"],"allergies":["Ninguna conocida"],"previousInjuries":["Esguince leve (2022)"],"familyHistory":["Ninguno relevante"],"personalHistory":["Operado de apéndice"]}'::jsonb,
  '{"extra":{"aiReports":[{"title":"Análisis de Recuperación Semanal","date":"15 Dic 2025","type":"Weekly"},{"title":"Predicción de Riesgo de Lesión","date":"01 Dic 2025","type":"Risk"}],"questionnaires":[{"date":"20 DIC 2025","name":"Well-being (WBQ)","score":"85/100","status":"Completo"},{"date":"19 DIC 2025","name":"Well-being (WBQ)","score":"82/100","status":"Completo"},{"date":"18 DIC 2025","name":"Well-being (WBQ)","score":"88/100","status":"Completo"}]},"extraTests":{"selected":["ECOGRAFÍA","RESONANCIA MAGNÉTICA (RMN)"],"comment":"Resultados pendientes de revisión por el especialista. El jugador presenta molestias leves en la zona."}}'::jsonb
) ON CONFLICT (player_id) DO NOTHING;

INSERT INTO injuries (player_id, date, type, diagnosis, status, severity, treatment, is_private)
VALUES ('12', '2025-11-15', 'Sobrecarga Isquios', 'Sobrecarga Isquios', 'Recuperada', 'medium', 'Rehabilitación estándar', false);

INSERT INTO injuries (player_id, date, type, diagnosis, status, severity, treatment, is_private)
VALUES ('12', '2025-11-15', 'Esguince Tobillo', 'Esguince Tobillo', 'Activa', 'medium', 'Rehabilitación estándar', false);

INSERT INTO injuries (player_id, date, type, diagnosis, status, severity, treatment, is_private)
VALUES ('12', '2025-08-15', 'Sobrecarga Isquios', 'Sobrecarga Isquios', 'Recuperada', 'medium', 'Rehabilitación estándar', false);

-- 5. Seed Active Injuries (Materializing Ad-Hoc Data)
-- Manuel Crujeiras (9) - Baja
INSERT INTO injuries (player_id, date, type, diagnosis, status, severity, treatment, estimated_return)
VALUES ('9', CURRENT_DATE - INTERVAL '12 days', 'Esguince', 'Esguince de Tobillo Grado II', 'Activa', 'high', 'Fisioterapia diaria + Fortalecimiento excéntrico', '2-3 semanas');

-- David Acosta (3) - Duda
INSERT INTO injuries (player_id, date, type, diagnosis, status, severity, treatment, estimated_return)
VALUES ('3', CURRENT_DATE - INTERVAL '3 days', 'Sobrecarga', 'Sobrecarga Muscular Isquiotibiales', 'Activa', 'medium', 'Descarga Miofascial + Movilidad', '3-5 días');

-- Emilis Prekivicius (7) - Duda
INSERT INTO injuries (player_id, date, type, diagnosis, status, severity, treatment, estimated_return)
VALUES ('7', CURRENT_DATE - INTERVAL '3 days', 'Sobrecarga', 'Sobrecarga Muscular Isquiotibiales', 'Activa', 'medium', 'Descarga Miofascial + Movilidad', '3-5 días');

-- Rafa Rodriguez (11) - Duda
INSERT INTO injuries (player_id, date, type, diagnosis, status, severity, treatment, estimated_return)
VALUES ('11', CURRENT_DATE - INTERVAL '3 days', 'Sobrecarga', 'Sobrecarga Muscular Isquiotibiales', 'Activa', 'medium', 'Descarga Miofascial + Movilidad', '3-5 días');
