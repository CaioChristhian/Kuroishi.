import { Flex, SimpleGrid, Box, Text, theme } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

import { Header } from "../components/Header";
import { SideBar } from '../components/SideBar';

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false
})

const options = {
  chart: {
    toolbar: {
      show: false
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500]
  },
  grid: {
    show: false
  },
  dataLabels: {
    enabled: false
  },
  tolltip: {
    enabled: false
  },
  xaxis: {
    type: 'datetime',
    axisBorder: {
      color: theme.colors.gray[600]
    },
    axisTicks: {
      color: theme.colors.gray[600]
    },
    categories: [
      '2021-11-24T00:00:00.000Z',
      '2021-11-25T00:00:00.000Z',
      '2021-11-26T00:00:00.000Z',
      '2021-11-27T00:00:00.000Z',
      '2021-11-28T00:00:00.000Z',
      '2021-11-29T00:00:00.000Z',
      '2021-11-30T00:00:00.000Z',
    ],
  },
  fill: {
    opacity: 0.3,
    type: 'gradiant',
    gradiant: {
      shade: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.3
    }
  }
}

const series = [
  { name: 'posts', data: [10, 5, 7, 15, 18, 4, 6] }
]

export default function Dashboard() {
  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <SideBar />

        <SimpleGrid flex="1" gap="4" minChildWidth="320px" align="flex-start">
          <Box
            p={["6", "8"]}
            bg="gray.800"
            borderRadius={8}
            pb="4"
          >
            <Text fontSize="lg" mb="4">
              Posts da semana
            </Text>
            <Chart type="area" options={options} series={series} height={160} />
          </Box>

          <Box
            p={["6", "8"]}
            bg="gray.800"
            borderRadius={8}
          >
            <Text fontSize="lg" mb="4">
              Inscritos
            </Text>
            <Chart type="area" options={options} series={series} height={160} />
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  )
}